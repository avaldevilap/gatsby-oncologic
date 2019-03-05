import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

import es from "date-fns/locale/es";

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
      <ApolloHooksProvider client={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          {element}
        </MuiPickersUtilsProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};
