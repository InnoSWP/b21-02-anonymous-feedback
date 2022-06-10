import "./style.scss";

import { Message as IMessage } from "../../Session/useSession";
import classNames from "classnames";
import useDisplayAge from "./useDisplayAge";

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
        {message.message}
      </p>
      <p className="message_age">{age}</p>
    </li>
  );
};

export default Message;
