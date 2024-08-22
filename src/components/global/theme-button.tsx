"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const spring = {
    type: "spring",
    stiffness: 7000,
    damping: 3000,
  };

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 ${isDarkMode ? "text-primary/50" : "text-primary"}`}
      />
      <div>
        <Switch
          checked={isDarkMode}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        ></Switch>
      </div>
      <Moon
        className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-primary/50"}`}
      />
    </div>
  );
}
