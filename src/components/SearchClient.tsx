"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import CategoryFilter from "@/components/CategoryFilter";
import ArticleGrid from "@/components/ArticleGrid";
import { filterArticles } from "@/lib/filterArticles";

export default function SearchClient({ articles }: { articles: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.category && set.add(a.category));
    return Array.from(set);
  }, [articles]);

  const filtered = useMemo(
    () => filterArticles(articles, search, selectedCategory),
    [articles, search, selectedCategory]
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6">
      <Input
        type="text"
        placeholder="Search articles by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        aria-label="Search articles"
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ArticleGrid articles={filtered} loading={false} />
    </div>
  );
} 