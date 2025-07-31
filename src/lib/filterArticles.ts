export function filterArticles(
  articles: any[],
  search: string,
  selectedCategory: string | null
) {
  return articles.filter((a) => {
    const matchesTitle = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });
} 