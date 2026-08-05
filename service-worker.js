//----------------------------------------------------
// QUINIELA MX
// SERVICE WORKER
//----------------------------------------------------


//----------------------------------------------------
// FIREBASE CLOUD MESSAGING
//----------------------------------------------------

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

console.log("🔥 Firebase Messaging iniciado");


const VERSION = "2.0.0";

const CACHE_NAME = `quiniela-mx-${VERSION}`;

//----------------------------------------------------
// ARCHIVOS PRINCIPALES
//----------------------------------------------------

const ARCHIVOS = [

    "./",
    "./quiniela.html",

    "./manifest.json",

    "./icons/icon-192.png",
    "./icons/icon-512.png",

];

//----------------------------------------------------
// INSTALACIÓN
//----------------------------------------------------

self.addEventListener("install", (event)=>{

    console.log("📦 Instalando PWA", VERSION);

    event.waitUntil((async()=>{

        const cache = await caches.open(CACHE_NAME);

        await cache.addAll(ARCHIVOS);

        await self.skipWaiting();

    })());

});


//----------------------------------------------------
// ACTIVACIÓN
//----------------------------------------------------

self.addEventListener("activate", (event)=>{

    console.log("✅ Activando PWA", VERSION);

    event.waitUntil((async()=>{

        const nombres = await caches.keys();

        await Promise.all(

            nombres.map(nombre=>{

                if(nombre!==CACHE_NAME){

                    console.log("🗑 Eliminando", nombre);

                    return caches.delete(nombre);

                }

            })

        );

        await self.clients.claim();

console.log("✅ PWA lista");

    })());

});


//----------------------------------------------------
// FETCH
//----------------------------------------------------

self.addEventListener("fetch",(event)=>{

    if(event.request.method!=="GET"){
        return;
    }

    event.respondWith((async()=>{

        try{

            const respuesta = await fetch(event.request);

            const cache = await caches.open(CACHE_NAME);

            cache.put(event.request,respuesta.clone());

            return respuesta;

        }catch(e){

            const cache = await caches.match(event.request);

            if(cache){
                return cache;
            }

            if(event.request.mode==="navigate"){

                const pagina = await caches.match("./quiniela.html");

                if(pagina){
                    return pagina;
                }

            }

            throw e;

        }

    })());

});


//----------------------------------------------------
// MENSAJES DESDE LA APLICACIÓN
//----------------------------------------------------

self.addEventListener("message",(event)=>{

    if(!event.data){
        return;
    }

    switch(event.data.tipo){

        case "SKIP_WAITING":

            console.log("♻ Actualizando Service Worker");

            self.skipWaiting();

            break;

        case "LIMPIAR_CACHE":

            event.waitUntil((async()=>{

                const nombres = await caches.keys();

                await Promise.all(

                    nombres.map(nombre=>caches.delete(nombre))

                );

                console.log("🗑 Caché eliminada");

            })());

            break;

    }

});

//----------------------------------------------------
// FIREBASE - MENSAJES EN SEGUNDO PLANO
//----------------------------------------------------

messaging.onBackgroundMessage((payload)=>{

    console.log("🟢 onBackgroundMessage");

    console.log(payload);

    console.log("NOTIFICACIÓN:", payload.notification);
console.log("DATA:", payload.data);

const titulo =
    payload.notification?.title ||
    payload.data?.title ||
    "Quiniela Liga MX";

const mensaje =
    payload.notification?.body ||
    payload.data?.body ||
    "Aquí se repite la notificación, @chat gpt";
/*
    self.registration.showNotification(titulo,{

        body: mensaje,

       icon: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/icons/icon-192.png",
       badge: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/icons/icon-192.png",

        vibrate:[200,100,200],

  //      requireInteraction:true,

        data:{
            url:"https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/"
        }

    });
*/
});
