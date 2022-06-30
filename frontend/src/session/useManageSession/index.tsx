import { useCallback, useMemo, useState } from "react";
import { Message, Session, SessionInfo } from "../types";
import notify from "./notify";
import useQuerySession from "./useQuerySession";
import useWatchMessages from "./useWatchMessages";
import useCloseSession from "./useCloseSession";
import useAverageRating from "./useAverageRating";

const useManageSession = (id: string): Session | null => {
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

  const averageRating = useAverageRating();

  const handleMessages = useCallback(
    (messages: Message[]) => {
      setMessages(messages);
      averageRating.calculate(messages);
    },
    [averageRating]
  );
  useQuerySession({
    id,
    onSessionInfo: setSessionInfo,
    onMessages: handleMessages,
  });

  const handleNewMessage = useCallback(
    (message: Message) => {
      setRecentMessages(
        (oldRecentMessages) => new Set([...oldRecentMessages, message])
      );
      setMessages((oldMessages) => [...oldMessages, message]);
      averageRating.update(message);

      if (sessionInfo !== null) {
        notify(sessionInfo, message);
      }
    },
    [averageRating, sessionInfo]
  );
  useWatchMessages({ id, onNewMessage: handleNewMessage });

  const callCloseSession = useCloseSession({ id });
  const closeSession = useCallback(async () => {
    const closed = await callCloseSession();
    setSessionInfo((oldSessionInfo) => {
      if (!oldSessionInfo) {
        return null;
      }

      return { ...oldSessionInfo, closed };
    });
  }, [callCloseSession]);

  return useMemo(() => {
    if (sessionInfo) {
      return {
        ...sessionInfo,
        averageRating: averageRating.rating,
        messages,
        recentMessages,
        removeRecentMessage,
        close: closeSession,
      };
    }

    return null;
  }, [
    averageRating.rating,
    closeSession,
    messages,
    recentMessages,
    removeRecentMessage,
    sessionInfo,
  ]);
};

export default useManageSession;
