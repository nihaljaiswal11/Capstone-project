export async function fetchContentful(query: string, variables: any) {
  const url = process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_URL;
  const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  const res = await fetch(url!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  return res.json();
} 