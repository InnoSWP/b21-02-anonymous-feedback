export interface Session {
  id: string;
  name: string;
  created: Timestamp;
  messages: Message[];
}

export interface Message {
  message: string;
  timestamp: string;
}

export interface Timestamp {
  timestamp: string;
}
