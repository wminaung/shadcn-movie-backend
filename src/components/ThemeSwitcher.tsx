"use client";

import { MyButton } from "@/app/shadcn/MyButton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container">
      The current theme is: {theme}
      <div>
        <MyButton onClick={() => setTheme("light")}>Light Mode</MyButton>
        <MyButton onClick={() => setTheme("dark")}>Dark Mode</MyButton>
      </div>
    </div>
  );
}
