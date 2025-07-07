"use client";
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../lib/queries';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import Footer from './Footer';
import { motion } from 'framer-motion';

export default function HomeClient() {
  const { data } = useQuery(GET_ARTICLES);
  const articles = data?.articleCollection?.items || Array.from({ length: 6 }).map((_, i) => ({
    title: `Sample Article ${i + 1}`,
    slug: `sample-article-${i + 1}`,
    category: i % 2 === 0 ? 'Climate' : 'Politics',
    coverImage: { url: '' },
    publishedDate: '2024-01-01',
  }));

  const featured = articles[0];
  const latest = articles.slice(1, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedArticle article={featured} />
      </motion.div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {latest.map((article: any, i: number) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <ArticleCard article={article} index={i} />
          </motion.div>
        ))}
      </section>
      <Footer />
    </div>
  );
} 