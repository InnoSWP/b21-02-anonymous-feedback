import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { webSocketLink } from "./webSocket";

const httpLink = new HttpLink({ uri: `/graphql` });

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === `OperationDefinition` &&
      definition.operation === `subscription`
    );
  },
  webSocketLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: `no-cache`,
      errorPolicy: `all`,
    },
  },
});

export default client;
