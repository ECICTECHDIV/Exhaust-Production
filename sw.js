// 浸染工卡 — Service Worker
// 策略：網路優先（online 時一定抓最新版本），只有離線時才退回使用快取。
// 這樣現場有網路時更新 index.html，重新整理就能看到新版；真的沒網路時仍可用舊版開啟。
const CACHE_NAME = "dye-work-order-v2";
const CORE_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting(); // 新版本安裝好立刻接手，不用等所有分頁都關掉
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // 只接管自己網域的檔案；外部 CDN（例如 html2canvas）交給瀏覽器自己的 HTTP 快取處理，不在這裡攔截
  let sameOrigin = false;
  try { sameOrigin = new URL(req.url).origin === self.location.origin; } catch (e) {}
  if (!sameOrigin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req)) // 離線時才退回用快取
  );
});
