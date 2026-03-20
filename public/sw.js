self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = { title: "HealthCore", body: "" };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch (_) {}
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      tag: "healthcore-push",
    })
  );
});
