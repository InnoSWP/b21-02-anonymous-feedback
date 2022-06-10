import "./style.scss";

import { Message as IMessage } from "../../Session/useSession";
import classNames from "classnames";

interface Props {
  message: IMessage;
  isRecent: boolean;
  onDated(): void;
}

const Message = ({ message, isRecent, onDated }: Props) => {
  return (
    <li className="message">
      <p className={classNames(`message_text`, { "-recent": isRecent })} onAnimationEnd={onDated}>
        {message.message}
      </p>
    </li>
  );
};

export default Message;
