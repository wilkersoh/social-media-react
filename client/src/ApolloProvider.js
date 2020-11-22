import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000", // point to graphql endpoit
});

const authLink = setContext((req, pre) => {
  const token = localStorage.getItem("jwtToken");
  return {
    // modified current request
    headers: {
      Authentication: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // [authLink, httplink] * before httpLink
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
