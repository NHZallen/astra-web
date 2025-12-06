// sw.js
const CACHE_NAME = 'astra-music-v60';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // 如果你有放 logo 圖片，也要寫在這裡，例如 './icon.png'
];

// 1. 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 攔截請求 (讓網頁優先讀取快取)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取有，就回傳快取；否則去網路抓
      return response || fetch(event.request);
    })
  );
});

// 3. 更新版本 (刪除舊快取)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

});

























































