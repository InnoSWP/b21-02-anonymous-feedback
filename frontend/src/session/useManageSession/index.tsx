import { useCallback, useMemo, useState } from "react";
import { Message, Session, SessionInfo } from "./types";
import notify from "./notify";
import useQuerySession from "./useQuerySession";
import useWatchMessages from "./useWatchMessages";

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

  useQuerySession({
    id,
    onSessionInfo: setSessionInfo,
    onMessages: setMessages,
  });

  const handleNewMessage = useCallback(
    (message: Message) => {
      setRecentMessages(
        (oldRecentMessages) => new Set([...oldRecentMessages, message])
      );
      setMessages((oldMessages) => [...oldMessages, message]);

      if (sessionInfo !== null) {
        notify(sessionInfo, message);
      }
    },
    [sessionInfo]
  );
  useWatchMessages({ id, onNewMessage: handleNewMessage });

  const session = useMemo(() => {
    if (sessionInfo) {
      return { ...sessionInfo, messages, recentMessages, removeRecentMessage };
    }

    return null;
  }, [messages, recentMessages, removeRecentMessage, sessionInfo]);

  return session;
};

export default useManageSession;
