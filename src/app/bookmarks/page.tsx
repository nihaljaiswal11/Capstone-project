"use client";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

export default function BookmarksPage() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
      setBookmarkedArticles(saved);
    }
  }, []);

  return (
    <main className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Bookmarked Articles</h1>
      {bookmarkedArticles.length === 0 ? (
        <p className="text-gray-500">You have no bookmarked articles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bookmarkedArticles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      )}
    </main>
  );
} 