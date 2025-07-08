import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  article: any;
  index?: number;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="hover:shadow-lg transition flex flex-col">
      <CardHeader>
        <CardTitle>{article?.title || 'Article Title'}</CardTitle>
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
  );
} 