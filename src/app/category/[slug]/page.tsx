import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const GET_CATEGORY_ARTICLES = `
  query GetArticlesByCategory($category: String!) {
    articleCollection(
      where: { category: $category }
      limit: 10
      order: publishedDate_DESC
    ) {
      items {
        title
        slug
        publishedDate
        category
        coverImage {
          url
        }
      }
    }
  }
`;

const PAGE_SIZE = 9;

export default async function CategoryPage(props: { params: { slug: string }, searchParams: { page?: string } }) {
  const { slug } = await props.params;
  const page = Number(props.searchParams?.page || 1);
  const skip = (page - 1) * PAGE_SIZE;

  console.log("slug:", slug);

  if (!slug) {
    return <div>Invalid category.</div>;
  }

  let articles: any[] = [];
  let total = 0;
  try {
    const res = await fetch(CONTENTFUL_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query GetArticlesByCategory($category: String!, $limit: Int!, $skip: Int!) {
          articleCollection(where: { category: $category }, limit: $limit, skip: $skip, order: publishedDate_DESC) {
            total
            items {
              title
              slug
              publishedDate
              category
              coverImage { url }
            }
          }
        }`,
        variables: { category: slug, limit: PAGE_SIZE, skip },
      }),
      next: { revalidate: 60 },
    });
    const { data } = await res.json();
    articles = data?.articleCollection?.items || [];
    total = data?.articleCollection?.total || 0;
  } catch (error) {
    console.error("Error fetching category articles:", error);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return (
    <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
        Articles in "{slug}" category
      </h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article) => (
            <Card key={article.slug} className="overflow-hidden shadow-md hover:shadow-xl transition">
              {article.coverImage?.url ? (
                <img
                  src={article.coverImage.url}
                  alt={article.title}
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
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles found.</p>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button asChild disabled={page <= 1}>
            <a href={`?page=${page - 1}`} aria-disabled={page <= 1}>Previous</a>
          </Button>
          <span className="self-center">Page {page} of {totalPages}</span>
          <Button asChild disabled={page >= totalPages}>
            <a href={`?page=${page + 1}`} aria-disabled={page >= totalPages}>Next</a>
          </Button>
        </div>
      )}
    </main>
  );
}
