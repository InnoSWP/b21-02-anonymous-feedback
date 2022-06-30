import { MessageContent } from "../types";

export interface SessionInfo {
  id: string;
  name: string;
  created: Date;
  closed: Date | null;
}

export interface Message {
  id: string;
  timestamp: Date;
  content: MessageContent;
}

export interface Session extends SessionInfo {
  averageRating: number | null;
  messages: Message[];
  recentMessages: Set<Message>;
  removeRecentMessage(message: Message): void;
  close(): Promise<void>;
}
