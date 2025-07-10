"use client";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const GET_ARTICLES = `
  query GetArticles {
    articleCollection(limit: 100, order: publishedDate_DESC) {
      items {
        title
        slug
        category
        publishedDate
        coverImage { url }
      }
    }
  }
`;

export default function SearchPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(CONTENTFUL_GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ query: GET_ARTICLES }),
        });
        const { data } = await res.json();
        setArticles(data?.articleCollection?.items || []);
      } catch (error) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.category && set.add(a.category));
    return Array.from(set);
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesTitle = a.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || a.category === selectedCategory;
      return matchesTitle && matchesCategory;
    });
  }, [articles, search, selectedCategory]);

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
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
          size="sm"
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="rounded-full capitalize"
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-0">
              <div className="hover:shadow-lg transition flex flex-col cursor-pointer rounded border bg-card">
                <div className="p-4">
                  <Skeleton className="w-full h-40 rounded mb-2" />
                  <Skeleton className="w-2/3 h-6 mb-1" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                key="no-articles"
                className="col-span-full text-center text-gray-500 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No matching articles
              </motion.div>
            ) : (
              filtered.map((article) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
} 