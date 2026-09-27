/* ============================================================
   SINGHANON — PWA glue
   Registers the service worker, offers an install button when
   the browser supports it, and shows a small banner when a new
   offline-cached version is ready.
   ============================================================ */

(function () {
  "use strict";

  const banner = document.getElementById("app-banner");
  const installBtn = document.getElementById("install-btn");
  let deferredPrompt = null;

  function showBanner(text, actionLabel, onAction) {
    banner.innerHTML = "";
    const span = document.createElement("span");
    span.textContent = text;
    banner.appendChild(span);
    if (actionLabel) {
      const btn = document.createElement("button");
      btn.textContent = actionLabel;
      btn.addEventListener("click", onAction);
      banner.appendChild(btn);
    }
    banner.style.display = "flex";
  }

  /* ---------- Install prompt (Chrome/Edge/Android) ---------- */

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "inline-block";
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    installBtn.style.display = "none";
    deferredPrompt = null;
  });

  /* ---------- Offline / online status ---------- */

  function handleConnectivity() {
    if (!navigator.onLine) {
      showBanner("You're offline — Singhanon still works from what's saved on this device.");
      setTimeout(() => { if (!navigator.onLine) return; banner.style.display = "none"; }, 4000);
    }
  }
  window.addEventListener("offline", handleConnectivity);
  window.addEventListener("online", () => { banner.style.display = "none"; });

  /* ---------- Service worker registration + update flow ---------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              showBanner("An updated version of Singhanon is ready.", "Reload", () => {
                installing.postMessage("SKIP_WAITING");
              });
            }
          });
        });
      }).catch((err) => {
        console.warn("Singhanon: service worker registration failed", err);
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  }
})();
