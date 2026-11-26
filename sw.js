// 지하철 온다!! 서비스 워커
// 아이폰 홈 화면 앱에서 알림(배너)을 띄우려면 서비스 워커가 있어야 해.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// 알림을 누르면 앱 열기
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  })());
});
