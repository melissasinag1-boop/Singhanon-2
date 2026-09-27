/* ============================================================
   SINGHANON — Service Worker
   Cache-first app shell so the dictionary (including data.js,
   i.e. every word entry) works fully offline once installed.
   ------------------------------------------------------------
   IMPORTANT: bump CACHE_VERSION any time you edit index.html,
   style.css, app.js, or data.js (e.g. after adding new words).
   Bumping it is what tells returning visitors' browsers to fetch
   the new files instead of serving the old cached copies.
   ============================================================ */

const CACHE_VERSION = "singhanon-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests for our own origin; let everything
  // else (e.g. cross-origin) pass through untouched.
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) {
    return;
  }

  // Page navigations: try the network first (so a connected user
  // always gets the latest build), fall back to the cached shell
  // when offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Everything else (CSS/JS/data/icons): cache-first, and quietly
  // refresh the cache in the background when online.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Allow the page to tell a waiting worker to activate immediately
// after the user confirms an "update available" prompt.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
