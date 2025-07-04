interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  // Simulate article data based on slug
  const article = {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    author: 'Jane Doe',
    content: 'This is a sample article body. You can replace this with real data fetched from an API or database.'
  };

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h1>{article.title}</h1>
      <p><strong>By:</strong> {article.author}</p>
      <article style={{ marginTop: 16 }}>{article.content}</article>
    </main>
  );
} 