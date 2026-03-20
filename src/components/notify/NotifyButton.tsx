"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function NotifyButton() {
  const [msg, setMsg] = useState("");
  const timerRef = useRef<number | null>(null);

  function showTemp(next: string) {
    setMsg(next);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMsg(""), 5000);
  }

  async function ping() {
    if (!("Notification" in window)) {
      showTemp("Notifications not supported in this browser.");
      return;
    }

    let perm: NotificationPermission = "default";
    try {
      perm = Notification.permission ?? "default";

      if (perm !== "granted" && perm !== "denied") {
        perm = await Notification.requestPermission();
      }
    } catch {
      showTemp("Could not request notification permission.");
      return;
    }

    if (perm !== "granted") {
      showTemp(perm === "denied" ? "Notification permission is denied." : "Notification permission was not granted.");
      return;
    }

    const options: NotificationOptions = {
      body: "Shift handoff reminder · review critical list",
      tag: `handoff-${Date.now()}`,
    };

    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification("HealthCare", options);
        showTemp("Notification sent.");
        return;
      } catch {
      }
    }

    try {
      new Notification("HealthCare", options);
      showTemp("Sent via browser (no service worker).");
    } catch {
      showTemp("Notification failed to show.");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant="ghost" className="!text-sm" onClick={ping}>
        Test care alert
      </Button>
      {msg ? <p className="text-xs text-[var(--muted)]">{msg}</p> : null}
    </div>
  );
}
