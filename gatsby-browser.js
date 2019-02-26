import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: `http://localhost:8080/v1alpha1/graphql`,
  request: operation =>
    operation.setContext({
      // headers: { "X-Hasura-Access-Key": process.env.HASURA_GRAPHQL_ACCESS_KEY }
      headers: { "X-Hasura-Access-Key": "YRz84zdxgEiSRnJ" }
    })
});

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{element}</ApolloHooksProvider>
    </ApolloProvider>
  );
};
