import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import EventEmitter from "events";
import { createClient } from "graphql-ws";

const makeWebSocketUrl = (pathname: string) => {
  const url = new URL(window.location.origin);
  url.protocol = url.protocol === `https:` ? `wss:` : `ws:`;
  url.pathname = pathname;

  return url.toString();
};

const url = makeWebSocketUrl(`/graphql`);

const webSocketClient = createClient({
  url,
  retryAttempts: Infinity,
  shouldRetry: () => true,
});
export const webSocketLink = new GraphQLWsLink(webSocketClient);

export type ConnectionStatus =
  | `disconnected`
  | `connecting`
  | `connected`
  | `error`;

class ConnectionWatcher extends EventEmitter {
  status: ConnectionStatus = `disconnected`;

  set(newStatus: ConnectionStatus) {
    this.status = newStatus;
    this.emit(`change`, newStatus);
  }

  constructor() {
    super();
    webSocketClient.on(`closed`, () => this.set(`disconnected`));
    webSocketClient.on(`connected`, () => this.set(`connected`));
    webSocketClient.on(`connecting`, () => this.set(`connecting`));
    webSocketClient.on(`error`, () => this.set(`error`));
  }

  on(_: `change`, handler: (status: ConnectionStatus) => void): this {
    super.on(`change`, handler);
    return this;
  }

  off(_: `change`, handler: (status: ConnectionStatus) => void): this {
    super.off(`change`, handler);
    return this;
  }
}

export const connectionStatus = new ConnectionWatcher();
