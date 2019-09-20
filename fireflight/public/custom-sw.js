self.addEventListener('push',ev=>{
    try {
        //decode push data
        const data=ev.data.json()
        //show notification with the body of the message, the title, and our icon (must be in public)
        self.registration.showNotification(data.title,{
            body:data.body,
            icon:'./push_images/FF-logo.png'
        })
    } catch (err) {
        console.error(err.message);
    }
})