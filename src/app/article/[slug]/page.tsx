import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import ImageSlideshow from "./ImageSlideshow";
import ShareButtons from "./ShareButtons";
import { notFound } from "next/navigation";
import { fetchContentful } from "@/lib/contentful";
import { GET_ARTICLE_BY_SLUG, GET_RELATED_ARTICLES } from "@/lib/queries";

function formatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}

function renderRichText(body: any) {
  if (!body || !body.json) return <p className="text-gray-500">No content.</p>;
  return body.json.content?.map((node: any, i: number) => {
    if (node.nodeType === "paragraph") {
      return <p key={i} className="mb-2">{node.content.map((c: any) => c.value).join("")}</p>;
    }
    return null;
  });
}

export default async function ArticleDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  let article: any = null;
  let related: any[] = [];

  try {
    // Fetch article
    const json = await fetchContentful(GET_ARTICLE_BY_SLUG, { slug });
    article = json?.data?.articleCollection?.items?.[0];
    // Fetch related articles if article found
    if (article) {
      const relJson = await fetchContentful(GET_RELATED_ARTICLES, { category: article.category, slug });
      related = relJson?.data?.articleCollection?.items || [];
    }
  } catch (error) {
    console.error("Error fetching article or related articles:", error);
  }

  if (!article) {
    notFound();
  }

  // For now, use only the cover image for the slideshow
  const images = article.coverImage?.url ? [article.coverImage.url] : [];

  return (
    <main className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-10">
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition">
        <div className="relative">
          <ImageSlideshow images={images} />
          <div className="absolute top-2 right-2 z-10">
            <BookmarkButton article={article} />
          </div>
        </div>
        {/* Real video player below the image slideshow */}
        <div className="w-full h-40 flex items-center justify-center mb-4">
          <video
            controls
            className="w-full h-40 object-cover rounded shadow"
            poster={images[0]}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl mb-2">{article.title}</CardTitle>
          <CardDescription className="mb-2">
            {article.category} • {formatDate(article.publishedDate)}
          </CardDescription>
          <ShareButtons article={article} />
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {renderRichText(article.body)}
          </div>
        </CardContent>
      </Card>
      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Related Articles</h3>
          <ul className="list-disc pl-5">
            {related.map((rel: any) => (
              <li key={rel.slug}>
                <Link href={`/article/${rel.slug}`} className="hover:underline">
                  {rel.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
} 