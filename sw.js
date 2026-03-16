const CACHE_NAME = "pastel-camila-v1";
const ASSETS = ["./","./index.html","./404.html","./manifest.json"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).then(networkResp => {
    const copy = networkResp.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{});
    return networkResp;
  }).catch(() => caches.match("./index.html"))));
});
