export const GET_ARTICLES = `
  query GetArticles {
    articleCollection(limit: 100, order: publishedDate_DESC) {
      items {
        title
        slug
        category
        publishedDate
        coverImage {
          url
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: String!) {
    articleCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publishedDate
        category
        coverImage { url }
        body { json }
      }
    }
  }
`;

export const GET_RELATED_ARTICLES = `
  query GetRelatedArticles($category: String!, $slug: String!) {
    articleCollection(where: { category: $category, slug_not: $slug }, limit: 5) {
      items {
        title
        slug
      }
    }
  }
`;

export const GET_CATEGORY_ARTICLES = `
  query GetArticlesByCategory($category: String!, $limit: Int!, $skip: Int!) {
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
  }
`; 