import "./style.scss";

import Message from "../Message";
import { Message as IMessage } from "../../Session/useSession";

interface Props {
  messages: IMessage[];
}

export const Messages = ({ messages }: Props) => {
  return (
    <ul className="messages">
      {[...messages].reverse().map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
};
