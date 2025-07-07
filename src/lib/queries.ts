import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles {
    articleCollection(limit: 10, order: publishedDate_DESC) {
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