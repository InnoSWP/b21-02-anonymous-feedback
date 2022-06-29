import "./style.scss";

import Message from "../Message";
import { Message as IMessage } from "../../types";

interface Props {
  messages: IMessage[];
  recentMessages: Set<IMessage>;
  onDatedMessage(message: IMessage): void;
}

export const Messages = ({
  messages,
  recentMessages,
  onDatedMessage,
}: Props) => {
  return (
    <ul className="messages">
      {[...messages].reverse().map((message) => (
        <Message
          key={message.id}
          message={message}
          isRecent={recentMessages.has(message)}
          onDated={() => onDatedMessage(message)}
        />
      ))}
    </ul>
  );
};
