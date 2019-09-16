
// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/app/install.js',
  '/app/main.css',
  '/app/main.js',
  '/assets/icon-512.png',
  '/assets/icon-256.png',
  '/assets/icon-144.png',
  '/assets/icon-128.png',
  '/assets/icon-96.png',
  '/assets/icon-64.png',
  '/assets/icon-32.png',
  '/assets/icon-24.png',
  '/assets/icon-16.png',
  '/libs/bootstrap/bootstrap-theme.min.css',
  '/libs/bootstrap/bootstrap.min.css',
  '/libs/bootstrap/bootstrap.min.js',
  '/libs/sweetalert/ngSweetAlert.min.js',
  '/libs/sweetalert/SweetAlert.css',
  '/libs/sweetalert/SweetAlert.min.js',
  '/libs/angular-1.3.6.min.js',
  '/libs/jquery-1.11.1.min.js',
  '/favicon.ico'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');

  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);

  // Intercept fetch requests to return cached values.
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
        .then((response) => {
          return response || fetch(evt.request);
        });
    })
  );  
});
