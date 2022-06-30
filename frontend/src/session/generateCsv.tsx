import { stringify } from "csv-stringify/sync";
import { Session } from "./types";

export const generateCsv = (session: Session): string => {
  const rows = [
    ["Session name", session.name],
    ["Created at", session.created.toISOString()],
  ];

  if (session.closed) {
    rows.push(["Closed at", session.closed.toISOString()]);
  }

  if (session.averageRating) {
    rows.push(["Average rating", String(session.averageRating)]);
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
