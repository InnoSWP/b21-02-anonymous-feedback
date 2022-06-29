export interface Session {
  id: string;
  name: string;
  created: Timestamp;
  closed: Timestamp | null;
  messages: Message[];
}

export interface Message {
  id: string;
  timestamp: Timestamp;
  content: MessageContent;
}

export type Rating = 1 | 2 | 3 | 4 | 5;
export type MessageContent = { text: string } | { rating: Rating };

export interface Timestamp {
  timestamp: string;
}
