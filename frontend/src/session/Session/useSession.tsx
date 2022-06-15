import { gql, useQuery, useSubscription } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { Session as RawSession, Message as RawMessage } from "../../types";
import notify from "./notify";

const SESSION_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      name
      messages {
        id
        text
        timestamp {
          timestamp
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
      id
      text
      timestamp {
        timestamp
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
  text: string;
  timestamp: Date;
}

export interface SessionInfo {
  id: string;
  name: string;
}

export interface Session extends SessionInfo {
  messages: Message[];
  recentMessages: Set<Message>;
  removeRecentMessage(message: Message): void;
}

const processMessage = ({
  id,
  text,
  timestamp: { timestamp },
}: RawMessage): Message => ({
  id,
  text,
  timestamp: new Date(timestamp),
});

const useWatchSession = (id: string): Session | null => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [recentMessages, setRecentMessages] = useState<Set<Message>>(new Set());
  const removeRecentMessage = useCallback(
    (message: Message) =>
      setRecentMessages((recentMessages) => {
        const newRecentMessages = new Set(recentMessages);
        newRecentMessages.delete(message);
        return newRecentMessages;
      }),
    []
  );

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

      const message = processMessage(data!.message);
      setRecentMessages(new Set([...recentMessages, message]));
      setMessages([...messages, message]);

      if (sessionInfo !== null) {
        notify(sessionInfo, message);
      }
    },
  });

  const session = useMemo(() => {
    if (sessionInfo) {
      return { ...sessionInfo, messages, recentMessages, removeRecentMessage };
    }

    return null;
  }, [messages, recentMessages, removeRecentMessage, sessionInfo]);

  return session;
};

export default useWatchSession;
