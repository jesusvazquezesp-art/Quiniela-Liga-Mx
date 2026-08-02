const CACHE_NAME = "quiniela-mx-v1";

self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activado");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    // Por ahora dejamos pasar todas las peticiones.
});
