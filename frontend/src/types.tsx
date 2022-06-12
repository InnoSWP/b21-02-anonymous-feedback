export interface Session {
  id: string;
  name: string;
  created: Timestamp;
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
