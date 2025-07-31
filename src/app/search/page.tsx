import { GET_ARTICLES } from "@/lib/queries";
import { fetchContentful } from "@/lib/contentful";
import SearchClient from "@/components/SearchClient";

export default async function SearchPage() {
  const data = await fetchContentful(GET_ARTICLES, {});
  const articles = data?.data?.articleCollection?.items || [];
  return <SearchClient articles={articles} />;
}