"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegister() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            setUpdateReady(true);
          }
        });
      });
    }).catch(() => {});

    const onController = () => setUpdateReady(false);
    navigator.serviceWorker.addEventListener("controllerchange", onController);
    return () => navigator.serviceWorker.removeEventListener("controllerchange", onController);
  }, []);

  if (!updateReady) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-gray-900 text-white rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <span className="text-sm">Neue Version verfügbar</span>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg shrink-0"
        >
          Aktualisieren
        </button>
      </div>
    </div>
  );
}
