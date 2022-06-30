import "./style.scss";

import { Message as IMessage } from "../../types";
import classNames from "classnames";
import useDisplayAge from "./useDisplayAge";
import Rating from "../Rating";

interface Props {
  message: IMessage;
  isRecent: boolean;
  onDated(): void;
}

const Message = ({ message, isRecent, onDated }: Props) => {
  const age = useDisplayAge(message.timestamp);

  return (
    <li className="message">
      <p
        className={classNames(`message_text`, { "-recent": isRecent })}
        onAnimationEnd={onDated}
      >
        {`text` in message.content && message.content.text}
        {`rating` in message.content && (
          <Rating rating={message.content.rating} id={`message${message.id}`} />
        )}
      </p>
      <p className="message_age">{age}</p>
    </li>
  );
};

export default Message;
