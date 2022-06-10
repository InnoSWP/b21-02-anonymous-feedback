import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Session as RawSession, Message as RawMessage } from "../../types";

const SESSION_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      name
      messages {
        message
        timestamp {
          Timestamp
        }
      }
    }
  }
`;

interface SessionQueryVariables {
  id: string;
}

interface SessionQueryResult {
  session: Pick<RawSession, "name" | "messages">;
}

export interface Message {
  id: string;
  message: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  name: string;
  messages: Message[];
}

const processMessage = (
  { message, timestamp: { Timestamp: timestamp } }: RawMessage,
  index: number
): Message => ({
  id: String(index),
  message,
  timestamp: new Date(timestamp),
});

const useWatchSession = (id: string) => {
  const [session, setSession] = useState<Session | null>(null);

  useQuery<SessionQueryResult, SessionQueryVariables>(SESSION_QUERY, {
    variables: { id },
    onCompleted({ session: { name, messages } }) {
      setSession({ id, name, messages: messages.map(processMessage) });
    },
  });

  return session;
};

export default useWatchSession;
