var cacheName = "js13kPWA-v1"; //create variable for storing the cache name
var appShellFiles = [
  //app shell files are listed in one array.
  "index.html",
  "script.js",
  "style.css",
  "/icons/bg-drain.jpg",
  "/icons/bg-dsnow.jpg",
  "/icons/bg-nrain.jpg",
  "/icons/bg-nsnow.jpg",
  "/icons/bg3.jpg",
  "/icons/bg.jpg",
];
//install event
//open a cache,then add all the files our app uses to the cache, so they are available next time it loads
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});
//caches is a special CacheStorage object available in the scope of the given Service Worker to enable saving data

//respond to the fetch event with a function
// that tries to find the resource in the cache and return the response if it's there.
// If not, we use another fetch request to fetch it from the network,
//then store the response in the cache so it will be available there next time it is requested.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
