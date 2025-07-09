import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  article: any;
  index?: number;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`} className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
      <Card className="hover:shadow-lg transition flex flex-col cursor-pointer">
        <CardHeader>
          <CardTitle className="group-hover:underline">{article?.title || 'Article Title'}</CardTitle>
          <CardDescription>{article?.category || 'Category'} • {article?.publishedDate ? new Date(article.publishedDate).toISOString().slice(0, 10) : 'Date'}</CardDescription>
        </CardHeader>
        <CardContent>
          {article?.coverImage?.url ? (
            <img
              src={article.coverImage.url}
              alt={article.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
          ) : (
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 