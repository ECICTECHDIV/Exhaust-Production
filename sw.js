// 浸染工卡 — Service Worker
// 策略：網路優先（online 時一定抓最新版本），只有離線時才退回使用快取。
// 這樣現場有網路時更新 index.html，重新整理就能看到新版；真的沒網路時仍可用舊版開啟。
const CACHE_NAME = "dye-work-order-v3";
const CORE_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];
// 技術手冊檔案較大，安裝時就直接快取起來，不用等使用者手動點開過一次才存
const HEAVY_ASSETS = [
  "./everzol-manual.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 核心檔案很小，一定要快取成功，失敗就整個安裝失敗（正常不會失敗）
      await cache.addAll(CORE_ASSETS);
      // 手冊檔案較大，用不會擋住安裝流程的方式快取：抓不到也不影響其他功能正常安裝，
      // 之後使用者實際點開時，fetch 攔截邏輯還是會再存一次
      await Promise.all(
        HEAVY_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn("Pre-cache failed, will retry later:", url, err))
        )
      );
    })
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
