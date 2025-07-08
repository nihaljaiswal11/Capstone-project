import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface FeaturedArticleProps {
  article: any;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Featured Article</CardTitle>
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
        <h3 className="text-xl font-semibold">{article?.title || 'Article Title'}</h3>
        <p className="text-gray-600 dark:text-gray-300">{article?.category || 'Category'} • {article?.publishedDate ? new Date(article.publishedDate).toISOString().slice(0, 10) : 'Date'}</p>
      </CardContent>
    </Card>
  );
} 