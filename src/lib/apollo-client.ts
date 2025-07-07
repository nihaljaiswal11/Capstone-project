import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/in9ickvhe7o9",
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer MQhr2rEaBuJpacMBYc2Gms6YxHAlerAZkEe9KB27v3Q",
    "Content-Type": "application/json", // ADD THIS
  },
});

export default client;
