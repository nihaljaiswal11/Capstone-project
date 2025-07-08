import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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

export default async function CategoryPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;

  console.log("slug:", slug);

  if (!slug) {
    return <div>Invalid category.</div>;
  }

  let articles: {
    title: string;
    slug: string;
    publishedDate: string;
    category: string;
    coverImage: { url: string };
  }[] = [];

  try {
    const res = await fetch(CONTENTFUL_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: GET_CATEGORY_ARTICLES,
        variables: { category: slug },
      }),
      next: { revalidate: 60 }, // ISR for Next.js
    });
    const { data } = await res.json();
    articles = data?.articleCollection?.items || [];
  } catch (error) {
    console.error("Error fetching category articles:", error);
  }

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
    </main>
  );
}
