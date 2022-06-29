import { Message as RawMessage } from "../../types";
import { Message } from "./types";

export const processMessage = ({
  id,
  text,
  timestamp: { timestamp },
}: RawMessage): Message => ({
  id,
  text,
  timestamp: new Date(timestamp),
});
