const convertVapid = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  console.log("done converting");
  return outputArray;
}

const sendSubscription = sub => {
  const location = "https://fireflight-lambda.herokuapp.com/api/push/register";
  try {
    console.log('yo')
    return fetch(location, {
      method: "POST",
      body: JSON.stringify(sub),
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
  } catch (error) {
    console.error('Error :', error);
  }
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
          console.log('attempting subscription', process.env.REACT_APP_VAPID_PUBLIC);
          const newSub = await registration.pushManager.subscribe({
            applicationServerKey: convertVapid,
            userVisibleOnly: true
          });
          
          console.log("new sub added", newSub);
          sendSubscription(newSub);
          return newSub
        } catch (err) {
          console.error('error');
          if (Notification.permission !== "granted") {
            console.log("no permission");
          } else {
            console.error("error durring subscription", err.message);
          }
        }
      } else {
        console.log("current sub detected");
        sendSubscription(reg);
      }
    } catch (err) {
      console.error("error during creation", err.message);
    }
  } else {
    console.log("missing worker");
  }
};
