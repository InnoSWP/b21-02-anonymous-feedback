export interface Session {
  id: string;
  name: string;
  created: Timestamp;
  closed: Timestamp | null;
  messages: Message[];
}

export interface Message {
  id: string;
  text: string;
  timestamp: Timestamp;
}

export interface Timestamp {
  timestamp: string;
}
