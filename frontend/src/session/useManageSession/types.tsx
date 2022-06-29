export interface SessionInfo {
  id: string;
  name: string;
  closed: Date | null;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

export interface Session extends SessionInfo {
  messages: Message[];
  recentMessages: Set<Message>;
  removeRecentMessage(message: Message): void;
}
