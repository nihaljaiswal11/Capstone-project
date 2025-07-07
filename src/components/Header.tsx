"use client";
import Link from "next/link";
import { useThemeStore } from "../store/theme-store";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const { isDark, toggle } = useThemeStore();
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <Link href="/" className="font-bold text-lg tracking-tight">
        NewsSite
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row gap-1 items-center"> {/* Ensure horizontal layout */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild active={pathname === "/"}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild active={pathname === "/category/climate"}>
              <Link href="/category/climate">Climate</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild active={pathname === "/category/economy"}>
              <Link href="/category/economy">Economy</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild active={pathname === "/category/politics"}>
              <Link href="/category/politics">Politics</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild active={pathname === "/search"}>
              <Link href="/search" aria-label="Search" className="ml-2">
                <span role="img" aria-label="search">🔍</span> Search
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* Example dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col gap-2">
                <NavigationMenuLink asChild active={pathname === "/search"}>
                  <Link href="/search" aria-label="Search" className="ml-2">
                    <span role="img" aria-label="search">🔍</span> Search
                  </Link>
                </NavigationMenuLink>
                {/* Add more dropdown links here if needed */}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <button
              onClick={toggle}
              className="ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
} 