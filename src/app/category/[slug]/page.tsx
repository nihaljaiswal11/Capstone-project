interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <div>Category List (placeholder) for slug: {params.slug}</div>;
} 