import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { fetchContentful } from "@/lib/contentful";
import { GET_CATEGORY_ARTICLES } from "@/lib/queries";
import Image from "next/image";

const PAGE_SIZE = 9;

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page || 1);
  const skip = (page - 1) * PAGE_SIZE;

  if (!slug) {
    return <div>Invalid category.</div>;
  }

  let articles: any[] = [];
  let total = 0;
  try {
    const data = await fetchContentful(GET_CATEGORY_ARTICLES, {
      category: slug,
      limit: PAGE_SIZE,
      skip,
    });
    articles = data?.data?.articleCollection?.items || [];
    total = data?.data?.articleCollection?.total || 0;
  } catch (error) {
    console.error("Error fetching category articles:", error);
  }

  if (!slug || articles.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return (
    <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
        Articles in "{slug}" category
      </h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article) => {
            const imgUrl = article.coverImage?.url
              ? `${article.coverImage.url}?w=400&h=200&fit=fill`
              : null;
            return (
              <Card key={article.slug} className="overflow-hidden shadow-md hover:shadow-xl transition">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                )}
                <CardContent className="p-4">
                  <Link href={`/article/${article.slug}`}>
                    <h2 className="text-base sm:text-lg font-semibold hover:underline line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(article.publishedDate).toISOString().slice(0, 10)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No articles found.</p>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button asChild disabled={page <= 1}>
            <a href={`?page=${page - 1}`} aria-disabled={page <= 1}>
              Previous
            </a>
          </Button>
          <span className="self-center">Page {page} of {totalPages}</span>
          <Button asChild disabled={page >= totalPages}>
            <a href={`?page=${page + 1}`} aria-disabled={page >= totalPages}>
              Next
            </a>
          </Button>
        </div>
      )}
    </main>
  );
}



