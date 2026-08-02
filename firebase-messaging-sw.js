importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");

self.registration.showNotification("SW Firebase", {
    body: "firebase-messaging-sw inició",
    icon: "/Quiniela-Liga-Mx/icons/icon-192.png"
});

firebase.initializeApp({
  apiKey: "AIzaSyCtEzANH1GWNESY_uNPpHD6MJpwuZkcvl8",
  authDomain: "quiniela-liga-mx-43fe2.firebaseapp.com",
  projectId: "quiniela-liga-mx-43fe2",
  storageBucket: "quiniela-liga-mx-43fe2.firebasestorage.app",
  messagingSenderId: "1080661326939",
  appId: "1:1080661326939:web:d5ecec86e19f274e72137e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload)=>{

    console.log("Notificación en segundo plano:", payload);
console.log("📩 Payload recibido:", payload);

    self.registration.showNotification(

        payload.notification.title,

        {
            body: payload.notification.body,
            icon: "/Quiniela-Liga-Mx/icons/icon-192.png",
            badge: "/Quiniela-Liga-Mx/icons/icon-192.png",
            vibrate: [200,100,200]
        }

    );

});

self.addEventListener("notificationclick", (event) => {
    console.log("🔔 CLICK", event.notification.title);

    event.notification.close();

    event.waitUntil(
        clients.openWindow("/Quiniela-Liga-Mx/")
    );
});
