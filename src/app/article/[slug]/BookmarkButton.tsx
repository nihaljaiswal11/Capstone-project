"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function BookmarkButton({ article }: { article: any }) {
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
      setBookmarked(saved.some((a: any) => a.slug === article.slug));
    }
  }, [article.slug]);
  function handleBookmark() {
    if (typeof window === "undefined") return;
    let saved = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
    if (bookmarked) {
      saved = saved.filter((a: any) => a.slug !== article.slug);
    } else {
      saved.push(article);
    }
    localStorage.setItem("bookmarkedArticles", JSON.stringify(saved));
    setBookmarked(!bookmarked);
  }
  return (
    <Button
      size="icon"
      variant={bookmarked ? "secondary" : "outline"}
      className={bookmarked ? "bg-yellow-300 dark:bg-yellow-700" : ""}
      title={bookmarked ? "Remove Bookmark" : "Bookmark"}
      onClick={handleBookmark}
      type="button"
    >
      {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
    </Button>
  );
} 