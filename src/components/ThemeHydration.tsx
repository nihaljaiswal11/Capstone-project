"use client";
import { useEffect } from "react";
import { useThemeStore } from "../store/theme-store";

export default function ThemeHydration() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return null;
} 