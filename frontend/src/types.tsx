export interface Session {
  id: string;
  name: string;
  created: Timestamp;
  messages: Message[];
}

export interface Message {
  id: string;
  message: string;
  timestamp: Timestamp;
}

export interface Timestamp {
  Timestamp: string;
}
