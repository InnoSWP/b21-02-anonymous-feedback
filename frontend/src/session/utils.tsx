import { Message as RawMessage, Timestamp } from "../types";
import { Message } from "./types";

export const processTimestamp = ({ timestamp }: Timestamp) =>
  new Date(timestamp);

export const processMessage = ({
  id,
  timestamp,
  content,
}: RawMessage): Message => ({
  id,
  timestamp: processTimestamp(timestamp),
  content,
});
