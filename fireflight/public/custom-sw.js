self.addEventListener('push',ev=>{
    try {
        const data=ev.data.json()
        console.log('push seen',data);
        self.registration.showNotification(data.title,{
            body:data.body,
            icon:'./push_images/FF-logo.png'
        })
    } catch (err) {
        console.error(err.message);
    }
})