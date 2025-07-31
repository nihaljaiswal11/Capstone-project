import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleGrid({
  articles,
  loading,
}: {
  articles: any[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-0">
            <div className="hover:shadow-lg transition flex flex-col cursor-pointer rounded border bg-card">
              <div className="p-4">
                <Skeleton className="w-full h-40 rounded mb-2" />
                <Skeleton className="w-2/3 h-6 mb-1" />
                <Skeleton className="w-1/3 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (articles.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500 py-8">
        No matching articles
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, i) => (
        <ArticleCard key={article.slug} article={article} index={i} />
      ))}
    </div>
  );
} 