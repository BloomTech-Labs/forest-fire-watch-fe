import { base_url_staging, base_url_local } from "../src/config/vars";
const convertVapid = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC);

console.log("original vapid key: " + process.env.REACT_APP_VAPID_PUBLIC);
console.log("convertVapid: " + convertVapid);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0;i < rawData.length;++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  // console.log("done converting");
  return outputArray;
}

const sendSubscription = sub => {
  const location = `${process.env.REACT_APP_ENV}push/register`;

  console.log(location);

  return fetch(location, {
    method: "POST",
    body: JSON.stringify(sub),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });
};

export const subscribeUser = async () => {
  if ("serviceWorker" in navigator) {
    try {
      console.log("sub attempt");
      const registration = await navigator.serviceWorker.ready;

      if (!registration.pushManager) {
        console.log("Push Manager Unavailable");
        return;
      }

      const reg = await registration.pushManager.getSubscription();
      if (reg === null) {
        console.log("no subscription, making request");
        try {
          const newSub = await registration.pushManager.subscribe({
            applicationServerKey: convertVapid,
            userVisibleOnly: true
          });

          console.log("new sub added", newSub);
          sendSubscription(newSub);
        } catch (err) {
          if (Notification.permission !== "granted") {
            console.log("no permission");
          } else {
            console.error("error durring subscription", err.message);
          }
        }
      } else {
        console.log("current sub detected", reg);
        sendSubscription(reg);
      }
    } catch (err) {
      console.error("error during creation", err.message);
    }
  } else {
    console.log("missing worker");
  }
};
