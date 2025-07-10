"use client";
import { useEffect, useState } from "react";
import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const GET_ARTICLES = `
  query GetArticles {
    articleCollection(limit: 31, order: publishedDate_DESC) {
      items {
        title
        slug
        category
        publishedDate
        coverImage {
          url
        }
      }
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export default function HomeClient() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        setArticles(Array.from({ length: 6 }).map((_, i) => ({
          title: `Sample Article ${i + 1}`,
          slug: `sample-article-${i + 1}`,
          category: i % 2 === 0 ? "Climate" : "Politics",
          coverImage: { url: "" },
          publishedDate: "2024-01-01",
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const featured = articles[0];
  const latest = articles.slice(1, 31);

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="mb-8">
              <Skeleton className="w-full h-40 rounded mb-2" />
              <Skeleton className="w-1/2 h-6 mb-2" />
              <Skeleton className="w-1/3 h-4 mb-2" />
              <Skeleton className="w-2/3 h-5" />
            </div>
          ) : (
            <FeaturedArticle article={featured} />
          )}
        </motion.div>
        <motion.h2
          className="text-2xl font-bold mb-6 mt-2 sm:mt-4"
          variants={textVariants}
        >
          Latest Articles
        </motion.h2>
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 flex-1 px-2 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 p-4">
                  <Skeleton className="w-full h-32 rounded mb-2" />
                  <Skeleton className="w-2/3 h-5 mb-1" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              ))
            : latest.map((article: any, i: number) => (
                <motion.div
                  key={article.slug}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <ArticleCard article={article} index={i} />
                </motion.div>
              ))}
        </motion.section>
      </motion.div>
      <Footer />
    </div>
  );
} 