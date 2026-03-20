"use client";

import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmVariant = "danger",
  confirmDisabled = false,
}: {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "ghost" | "danger";
  confirmDisabled?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  // Render to `document.body` so the overlay is always relative to the viewport
  // (not affected by any ancestor `transform` / stacking contexts).
  return createPortal(
    <div className="fixed inset-0 z-50 px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />

      <div
        className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <Card className="p-0 overflow-hidden">
          <div className="p-5">
            <h2 id={titleId} className="text-base font-semibold">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm text-(--muted)">{description}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-(--border) bg-(--surface) p-5">
            <Button variant="ghost" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={() => void onConfirm()}
              disabled={confirmDisabled}
            >
              {confirmText}
            </Button>
          </div>
        </Card>
      </div>
    </div>,
    document.body
  );
}

