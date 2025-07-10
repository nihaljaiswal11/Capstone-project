import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
          <Image
            src={article.coverImage.url}
            alt={article.title}
            width={800}
            height={320}
            className="w-full h-40 object-cover rounded mb-2"
            style={{ aspectRatio: "2.5/1" }}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4z8DwHwAFgwJ/lwQnNwAAAABJRU5ErkJggg=="
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