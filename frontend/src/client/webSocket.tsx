import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const makeWebSocketUrl = (pathname: string) => {
  const url = new URL(window.location.origin);
  url.protocol = url.protocol === `https:` ? `wss:` : `ws:`;
  url.pathname = pathname;

  return url.toString();
};

const url = makeWebSocketUrl(`/graphql`);

const webSocketClient = createClient({ url });
export const webSocketLink = new GraphQLWsLink(webSocketClient);
