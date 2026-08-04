importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCiszOT3kJITj2CBOUkMgloNNLevH5RYEo",
  authDomain: "quiniela-liga-mx-2.firebaseapp.com",
  projectId: "quiniela-liga-mx-2",
  storageBucket: "quiniela-liga-mx-2.firebasestorage.app",
  messagingSenderId: "325502110908",
  appId: "1:325502110908:web:012b12571b5d85ac5354b9"
});

const messaging = firebase.messaging();

console.log("🔥 SW cargado");

messaging.onBackgroundMessage((payload) => {

    console.log("📩 MENSAJE RECIBIDO", payload);

    self.registration.showNotification("PRUEBA", {
        body: JSON.stringify(payload),
        icon: "/Quiniela-Liga-Mx/icons/icon-192.png"
    });

});
