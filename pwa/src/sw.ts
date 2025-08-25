/// <reference lib="webworker" />
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('advice-static-v1').then((c) => c.addAll(['/', '/index.html'])).catch(() => {})
  );
});
self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request)).catch(() => fetch(e.request))
  );
});
