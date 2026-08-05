//----------------------------------------------------
// FIREBASE - MENSAJES EN SEGUNDO PLANO
//----------------------------------------------------

messaging.onBackgroundMessage((payload)=>{

    console.log("🟢 onBackgroundMessage");

    console.log(payload);

    const titulo =
        payload.notification?.title || "Quiniela Liga MX";

    const mensaje =
        payload.notification?.body || "";

    self.registration.showNotification(titulo,{

        body: mensaje,

        icon: "/Quiniela-Liga-Mx/icons/icon-192.png",

        badge: "/Quiniela-Liga-Mx/icons/icon-192.png",

        vibrate:[200,100,200],

        requireInteraction:true,

        data:{
            url:"https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/"
        }

    });

});
