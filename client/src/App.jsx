import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import React, { Component } from "react";
import { onError } from "@apollo/client/link/error";
import withParams from "./components/withParams";
import MainWrap from "./components/layout/MainWrap";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => (
      alert(`GraphQL error: ${message}`)
    ));
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainWrap />
      </ApolloProvider>
    )
  };
}

export default withParams(App, [], []);
