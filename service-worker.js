const CACHE_NAME = "sports-trivia-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest(1).json",
  "/icon-192.png",
  "/icon-512.png"
];

// INSTALAÇÃO (salva arquivos no cache)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache criado");
      return cache.addAll(urlsToCache);
    })
  );
});

// ATIVAÇÃO (limpa cache antigo)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH (responde com cache ou internet)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
