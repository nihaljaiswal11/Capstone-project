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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const { isDark, toggle } = useThemeStore();
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <Link href="/" className="font-bold text-lg tracking-tight">
        NewsSite
      </Link>
      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-1 items-center">
            <NavigationMenuItem>
              <NavigationMenuLink asChild active={pathname === "/"}>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-2 min-w-[180px]">
                  <NavigationMenuLink asChild active={pathname === "/category/climate"}>
                    <Link href="/category/climate">Climate</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild active={pathname === "/category/economics"}>
                    <Link href="/category/economics">Economics</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild active={pathname === "/category/politics"}>
                    <Link href="/category/politics">Politics</Link>
                  </NavigationMenuLink>
                  {/* Add more categories here if needed */}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild active={pathname === "/search"}>
                <Link href="/search" aria-label="Search" className="ml-2">
                  <span role="img" aria-label="search">🔍</span> Search
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild active={pathname === "/bookmarks"}>
                <Link href="/bookmarks" aria-label="Bookmarks" className="ml-2">
                  <span role="img" aria-label="bookmark">🔖</span> Bookmarks
                </Link>
              </NavigationMenuLink>
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
      </nav>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open menu">
              <Menu className="w-7 h-7" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            <nav className="flex flex-col gap-2 p-6">
              <Link href="/" className="font-bold text-lg mb-4">NewsSite</Link>
              <Link href="/" className={pathname === "/" ? "font-semibold underline" : ""}>Home</Link>
              <div className="mt-2 mb-1 font-semibold text-sm text-muted-foreground">Categories</div>
              <Link href="/category/climate" className={pathname === "/category/climate" ? "font-semibold underline" : ""}>Climate</Link>
              <Link href="/category/economics" className={pathname === "/category/economics" ? "font-semibold underline" : ""}>Economics</Link>
              <Link href="/category/politics" className={pathname === "/category/politics" ? "font-semibold underline" : ""}>Politics</Link>
              {/* Add more categories here if needed */}
              <Link href="/search" className={pathname === "/search" ? "font-semibold underline mt-2" : "mt-2"}>
                <span role="img" aria-label="search">🔍</span> Search
              </Link>
              <Link href="/bookmarks" className={pathname === "/bookmarks" ? "font-semibold underline mt-2" : "mt-2"}>
                <span role="img" aria-label="bookmark">🔖</span> Bookmarks
              </Link>
              <button
                onClick={toggle}
                className="mt-4 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left"
                aria-label="Toggle dark mode"
                type="button"
              >
                {isDark ? "🌙" : "☀️"} Toggle Theme
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 