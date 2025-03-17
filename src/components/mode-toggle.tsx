"use client";

import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <LuMoon className="h-4 w-4" />
      ) : (
        <LuSun className="h-4 w-4 " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
