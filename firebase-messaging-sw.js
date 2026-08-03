importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");



firebase.initializeApp({
  apiKey: "AIzaSyCtEzANH1GWNESY_uNPpHD6MJpwuZkcvl8",
  authDomain: "quiniela-liga-mx-43fe2.firebaseapp.com",
  projectId: "quiniela-liga-mx-43fe2",
  storageBucket: "quiniela-liga-mx-43fe2.firebasestorage.app",
  messagingSenderId: "1080661326939",
  appId: "1:1080661326939:web:d5ecec86e19f274e72137e"
});

const messaging = firebase.messaging();









messaging.onBackgroundMessage(async (payload)=>{

console.log("🟢 PASO 6 - Firebase entregó el mensaje");
console.log(payload);



    console.log("📩 Payload:", payload);

    const titulo = payload.notification?.title || "Quiniela Liga MX";

    const mensaje = payload.notification?.body || "";

    await self.registration.showNotification(

        "🏆 Quiniela Liga MX",

        {
            body: titulo + "\n\n" + mensaje,

            icon: "/Quiniela-Liga-Mx/icons/icon-192.png",

            badge: "/Quiniela-Liga-Mx/icons/icon-192.png",

            vibrate: [200,100,200],

            tag: "quiniela-noticia",

            renotify: true,

            requireInteraction: true,

            timestamp: Date.now(),

            data:{
                url:"https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/"
            }

        }

    );

});



//----------------------------------------------------
// CLICK EN LA NOTIFICACIÓN
//----------------------------------------------------

self.addEventListener("notificationclick", (event)=>{

    event.notification.close();

    event.waitUntil((async()=>{

        const url = event.notification.data?.url ||
            "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/";

        const ventanas = await clients.matchAll({
            type: "window",
            includeUncontrolled: true
        });

        for(const ventana of ventanas){

            if(ventana.url.startsWith(url)){

                await ventana.focus();

                ventana.postMessage({
                    tipo:"ABRIR_NOTICIAS"
                });

                return;

            }

        }

        await clients.openWindow(url);

    })());

});
