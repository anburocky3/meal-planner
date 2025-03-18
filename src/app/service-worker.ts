export function GET() {
  const swContentString = `
    const CACHE_NAME = 'indian-meal-planner-v1';
    const OFFLINE_URL = '/offline';
    
    const ASSETS_TO_CACHE = [
      '/',
      '/meal-plan',
      '/meals',
      '/settings',
      '/shop',
      '/offline',
      '/manifest',
      '/icons/icon-192x192.png',
      '/icons/icon-384x384.png',
      '/icons/icon-512x512.png',
      '/screenshots/1.png',
      '/screenshots/2.png',
      '/screenshots/3.png'
    ];

    // Install Service Worker
    self.addEventListener('install', (event) => {
      event.waitUntil(
        (async () => {
          const cache = await caches.open(CACHE_NAME);
          await cache.addAll(ASSETS_TO_CACHE);
          // Force service worker to become active
          self.skipWaiting();
        })()
      );
      console.log('Service Worker installed successfully');
    });

    // Activate Service Worker
    self.addEventListener('activate', (event) => {
      event.waitUntil(
        (async () => {
          // Clear old caches
          const cacheKeys = await caches.keys();
          const deletePromises = cacheKeys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key));
          
          await Promise.all(deletePromises);
          
          // Take immediate control
          await self.clients.claim();
        })()
      );
      console.log('Service Worker activated successfully');
    });

    // Fetch event handler - Network first with cache fallback strategy
    self.addEventListener('fetch', (event) => {
      // Skip cross-origin requests
      if (!event.request.url.startsWith(self.location.origin)) {
        return;
      }
      
      // Skip non-GET requests
      if (event.request.method !== 'GET') {
        return;
      }
      
      // Dynamic content - network first, fallback to offline page
      if (event.request.headers.get('Accept')?.includes('text/html')) {
        event.respondWith(
          (async () => {
            try {
              // Try the network first
              const networkResponse = await fetch(event.request);
              
              // If successful, cache the response for future use
              const cache = await caches.open(CACHE_NAME);
              cache.put(event.request, networkResponse.clone());
              
              return networkResponse;
            } catch (error) {
              // Network failed, try to get from cache
              const cachedResponse = await caches.match(event.request);
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If not in cache, return the offline page
              return caches.match(OFFLINE_URL);
            }
          })()
        );
        return;
      }
      
      // For other resources (images, CSS, JS) - cache first, network fallback
      event.respondWith(
        (async () => {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          try {
            // If not in cache, try network
            const networkResponse = await fetch(event.request);
            
            // Cache successful responses for future use
            if (networkResponse.ok) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(event.request, networkResponse.clone());
            }
            
            return networkResponse;
          } catch (error) {
            // No cache, no network - no response
            console.log('Fetch failed:', error);
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          }
        })()
      );
    });
  `;

  return new Response(swContentString, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
