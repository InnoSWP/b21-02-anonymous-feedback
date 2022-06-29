import { stringify } from "csv-stringify/sync";
import { Message as RawMessage, Timestamp } from "../types";
import { Message, Session } from "./types";

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

export const generateCsv = (session: Session): string => {
  const rows = [
    ["Session name", session.name],
    ["Created at", session.created.toISOString()],
  ];

  if (session.closed) {
    rows.push(["Closed at", session.closed.toISOString()]);
  }

  rows.push([], ["Feedback type", "Content", "Time"]);

  for (const message of session.messages) {
    let type;
    let content;

    if (`text` in message.content) {
      type = `Text message`;
      content = message.content.text;
    } else {
      type = `Rating`;
      content = String(message.content.rating);
    }

    const row = [type, content, message.timestamp.toISOString()];
    rows.push(row);
  }

  return stringify(rows);
};
