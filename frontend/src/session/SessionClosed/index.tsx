import "./style.scss";

import { useSession } from "../Session";
import Button from "../../Button";

const plural = (
  number: number,
  { one, many }: { one: string; many: string }
) => {
  const word = number === 1 ? one : many;

  return `${number} ${word}`;
};

const SessionClosed = () => {
  const session = useSession();

  return (
    <main className="sessionClosed">
      <div className="sessionClosed_info">
        <h1 className="sessionClosed_title">
          You closed the feedback session {}
          <span className="sessionClosed_sessionName">{session.name}</span>
        </h1>
        <p className="sessionClosed_statistics">
          During the session, you received {}
          {plural(session.messages.length, {
            one: `message`,
            many: `messages`,
          })}
        </p>
      </div>
      <div className="sessionClosed_buttons">
        <Button to="/new-session">Create a new session</Button>
      </div>
    </main>
  );
};

export default SessionClosed;
