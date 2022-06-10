import "./style.scss";

import Button from "../../Button";
import Connected from "./Connected";
import { useSession } from "../Session";
import NoMessages from "./NoMessages";

const SessionView = () => {
  const session = useSession();

  return (
    <>
      <header className="sessionView_header">
        <h1 className="sessionView_name">{session.name}</h1>
        <div className="sessionView_controls">
          <Button>Copy join link</Button>
          <Button color="red">Close the session</Button>
        </div>
      </header>
      <main className="sessionView_content">
        <Connected />
        {session.messages.length === 0 && <NoMessages />}
      </main>
    </>
  );
};

export default SessionView;
