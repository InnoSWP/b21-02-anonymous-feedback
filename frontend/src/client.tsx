import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({ uri: `/graphql` });

const subscriptionUrlParsed = new URL(window.location.origin);
subscriptionUrlParsed.protocol =
  subscriptionUrlParsed.protocol === `https:` ? `wss:` : `ws:`;
subscriptionUrlParsed.pathname = `/graphql`;
const subscriptionUrl = subscriptionUrlParsed.toString();
const wsLink = new GraphQLWsLink(createClient({ url: subscriptionUrl }));

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === `OperationDefinition` &&
      definition.operation === `subscription`
    );
  },
  wsLink,
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
