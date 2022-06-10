import "./style.scss";

import { Message as IMessage } from "../../Session/useSession";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props) => {
  return (
    <li className="message">
      <p className="message_text">{message.message}</p>
    </li>
  );
};

export default Message;
