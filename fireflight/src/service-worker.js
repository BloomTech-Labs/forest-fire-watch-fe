import icon from './images/FF-logo.png';
console.log('push worker loaded');

self.addEventListener('push',ev=>{
    const data=ev.data.json()
    console.log('push seen',data);
    self.registration.showNotification(data.title,{
        body:"Worker Registered",
        icon:icon
    })
})