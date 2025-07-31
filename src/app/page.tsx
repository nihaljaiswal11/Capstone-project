import { GET_ARTICLES } from "@/lib/queries";
import { fetchContentful } from "@/lib/contentful";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const data = await fetchContentful(GET_ARTICLES, {});
  const articles = data?.data?.articleCollection?.items || [];
  const featured = articles[0];
  const latest = articles.slice(1, 31);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        {featured && featured.coverImage && <FeaturedArticle article={featured} />}
        <h2 className="text-2xl font-bold mb-6 mt-2 sm:mt-4">Latest Articles</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 flex-1 px-2 sm:px-0">
          {latest.map((article: any, i: number) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
} 