"use client";

import Link from "next/link";
import { Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-orange-50 dark:bg-gray-900">
      <Card className="max-w-md w-full border-none shadow-lg">
        <CardHeader className="bg-orange-500 dark:bg-gray-800 text-white rounded-t-lg py-6 text-center">
          <CardTitle className="flex justify-center items-center gap-2 text-xl">
            {isOnline ? (
              <Wifi className="h-5 w-5" />
            ) : (
              <WifiOff className="h-5 w-5" />
            )}
            {isOnline ? "You're back online!" : "You're offline"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {isOnline ? (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300">
                Great! Your internet connection has been restored. You can now
                continue using the app with full functionality.
              </p>
              <div className="flex justify-center">
                <Link href="/">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Go to Home
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-gray-700 dark:text-gray-300">
                It looks like you&apos;re not connected to the internet. Some
                features of Indian Meal Planner may not be available.
              </p>
              <div className="space-y-4">
                <div className="bg-orange-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
                    What you can still do:
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>View previously loaded meal plans</li>
                    <li>Check your shopping list</li>
                    <li>View recipes you&apos;ve already opened</li>
                    <li>Use the dark/light mode toggle</li>
                  </ul>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Try Again
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
