// Service Worker for GitHub Pages PWA
const CACHE_NAME = 'edubarret0dev-v2'; // Bumped version to force update
const STATIC_ASSETS = [
    '/assets/css/modern.min.css',
    '/assets/css/font-awesome.min.css',
    '/assets/js/site.min.js',
    '/images/avatar.webp',
    '/images/bg.webp',
    '/images/favicon.svg',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

const APP_SHELL = [
    '/',
    '/index.html',
    '/pages/projetos.html',
    '/pages/artigos.html',
    '/pages/servicos.html',
    '/pages/downloads.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                // Cache critical assets immediately
                return cache.addAll([...STATIC_ASSETS, ...APP_SHELL]);
            })
    );
    // Force new service worker to activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Claim clients immediately so they don't need a reload to be controlled
    self.clients.claim();
});

// Fetch event - Strategy: Network First for HTML/Data, Cache First for Assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Strategy 1: Network First (HTML files and Markdown content)
    // Ensures users always get the latest content updates
    if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('.md')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Update cache with new version
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if offline
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Strategy 2: Cache First (Static Assets: CSS, JS, Images, Fonts)
    // Improves performance for files that rarely change
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((response) => {
                    // Don't cache non-successful responses or basic types
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
    );
});
