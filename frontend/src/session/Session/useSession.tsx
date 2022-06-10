import { gql, useQuery, useSubscription } from "@apollo/client";
import { useMemo, useState } from "react";
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

interface SessionQueryResult {
  session: Pick<RawSession, "name" | "messages">;
}

const MESSAGE_SUBSCRIPTION = gql`
  subscription ($id: ID!) {
    message: watchSession(id: $id) {
      message
      timestamp {
        Timestamp
      }
    }
  }
`;

interface MessageSubscriptionResult {
  message: RawMessage;
}

interface Variables {
  id: string;
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
type SessionInfo = Omit<Session, "messages">;

const processMessage = (
  { message, timestamp: { Timestamp: timestamp } }: RawMessage,
  index: number
): Message => ({
  id: String(index),
  message,
  timestamp: new Date(timestamp),
});

const useWatchSession = (id: string): Session | null => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useQuery<SessionQueryResult, Variables>(SESSION_QUERY, {
    variables: { id },
    onCompleted({ session: { name, messages: newMessages } }) {
      setMessages(newMessages.map(processMessage));
      setSessionInfo({ id, name });
    },
  });

  useSubscription<MessageSubscriptionResult, Variables>(MESSAGE_SUBSCRIPTION, {
    variables: { id },
    onSubscriptionData({ subscriptionData: { data, error } }) {
      if (error) {
        throw error;
      }

      const message = processMessage(data!.message, messages.length);
      setMessages([...messages, message]);
    },
  });

  const session = useMemo(() => {
    if (sessionInfo) {
      return { ...sessionInfo, messages };
    }

    return null;
  }, [messages, sessionInfo]);

  return session;
};

export default useWatchSession;
