"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface CustomWindow extends Window {
  MSStream?: unknown;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isIOSDismissed, setIsIOSDismissed] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as CustomWindow).MSStream;
    setIsIOSDevice(isIOS);

    // Check if iOS banner was dismissed
    const isDismissed = localStorage.getItem("pwa_ios_dismissed") === "true";
    setIsIOSDismissed(isDismissed);

    // Check if app is already installed (running in standalone mode)
    const isInStandaloneMode =
      (navigator as any).standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (isInStandaloneMode) {
      setIsInstallable(false);
      setIsIOSDevice(false);
      return;
    }

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  // Handle PWA installation
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the PWA installation");
    } else {
      console.log("User dismissed the PWA installation");
    }

    // Reset the deferredPrompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Handle iOS dismiss
  const handleIOSDismiss = () => {
    localStorage.setItem("pwa_ios_dismissed", "true");
    setIsIOSDismissed(true);
  };

  if (!isInstallable && (!isIOSDevice || isIOSDismissed)) return null;

  return (
    <div className="fixed bottom-10 right-4 z-50">
      <Button
        onClick={handleInstallClick}
        className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full p-4"
      >
        <Download className="h-5 w-5" />
        <span className="ml-2">Install App</span>
      </Button>

      {isIOSDevice && !isIOSDismissed && (
        <div className="mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg text-sm max-w-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">Install this app on your iPhone:</p>
              <ol className="list-decimal pl-5 mt-1">
                <li>Tap the Share button</li>
                <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
              </ol>
            </div>
            <button
              onClick={handleIOSDismiss}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
