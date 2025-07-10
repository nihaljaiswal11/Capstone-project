import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ArticleCardProps {
  article: any;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  // Optimize Contentful image URL for card size
  const imgUrl = article?.coverImage?.url
    ? `${article.coverImage.url}?w=400&h=200&fit=fill`
    : null;
  const isPriority = index === 0;
  return (
    <Link href={`/article/${article.slug}`} className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
      <Card className="hover:shadow-lg transition flex flex-col cursor-pointer">
        <CardHeader>
          <CardTitle className="group-hover:underline">{article?.title || 'Article Title'}</CardTitle>
          <CardDescription>{article?.category || 'Category'} • {article?.publishedDate ? new Date(article.publishedDate).toISOString().slice(0, 10) : 'Date'}</CardDescription>
        </CardHeader>
        <CardContent>
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded mb-2"
              style={{ aspectRatio: "2/1" }}
              priority={isPriority}
              sizes="(max-width: 768px) 100vw, 33vw"
              {...(!isPriority ? { loading: "lazy" } : {})}
            />
          ) : (
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 