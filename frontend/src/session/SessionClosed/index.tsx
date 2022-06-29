import "./style.scss";

import { useSession } from "../Session";
import Button from "../../Button";
import { Session } from "../useManageSession/types";
import { Navigate } from "react-router";

const plural = (
  number: number,
  { one, many }: { one: string; many: string }
) => {
  const word = number === 1 ? one : many;

  return `${number} ${word}`;
};

interface Props {
  session: Session;
}

const SessionClosed = ({ session }: Props) => {
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
        <Button to="/">Go to the home page</Button>
      </div>
    </main>
  );
};

const Guard = () => {
  const session = useSession();

  if (!session.closed) {
    return <Navigate to=".." replace={true} />;
  }

  return <SessionClosed session={session} />;
};

export default Guard;
