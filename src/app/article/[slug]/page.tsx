interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  return <div>Article Detail (placeholder) for slug: {params.slug}</div>;
} 