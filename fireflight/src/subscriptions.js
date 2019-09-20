const convertVapid = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC);

/**
 * 
 * @param {string} base64String used for security purposes
 */
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

/**
 * Registers your account with the back end database.
 * @param {object} sub subscription to send to the back end
 */
const sendSubscription = sub => {
  const location = process.env.NODE_ENV==="production"?"https://fireflight-lambda.herokuapp.com/api/push/register":'http://localhost:5000/api/push/register';
  try {
    console.log('yo',location)
    fetch(location,{
      method:'POST',
      body:JSON.stringify(sub),
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
  } catch (error) {
    console.error('Error :', error);
  }
};

/**
 * Attempts to subscribe the user to the backend database. Does operations to lead up to that effect
 */
export const subscribeUser = async () => {
  //If the pushManager exists....
  if(!('pushManager' in window)){
    console.log('manager missing');
  }
  //and the browser supports service workers
  if ("serviceWorker" in navigator) {
    try {
      //get the worker registration data from the worker when it is available
      const registration = await navigator.serviceWorker.ready;

      //if you can't, end now.
      if (!registration.pushManager) {
        console.log("Push Manager Unavailable");
        return;
      }

      //check to see if the sub already exists
      const reg = await registration.pushManager.getSubscription();

      //if not
      if (reg === null) {
        try {
          //subscribe and send to back end using function above
          const newSub = await registration.pushManager.subscribe({
            applicationServerKey: convertVapid,
            userVisibleOnly: true
          });

          sendSubscription(newSub);
        } catch (err) {

          console.error('error');
          //if they didn't have permission, log it
          if (Notification.permission !== "granted") {
            console.log("no permission");
          } else {
            console.error("error durring subscription", err.message);
          }

        }
      } else {
        //you already had a sub you dolt
        console.log("current sub detected");
        sendSubscription(reg);
      }
    } catch (err) {
      // can't make it
      console.error("error during creation", err.message);
    }
  } else {
    //update your browser to something more current than the 90's
    console.log("missing worker");
  }
};
