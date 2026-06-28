const CACHE_NAME = 'math-penalty-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/game.html',
    '/css/style.css',
    '/css/responsive.css',
    '/js/app.js',
    '/js/game.js',
    '/js/question.js',
    '/js/save.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});