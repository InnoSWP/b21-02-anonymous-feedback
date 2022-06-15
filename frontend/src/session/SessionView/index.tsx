import "./style.scss";

import Button from "../../Button";
import Connected from "./Connected";
import { useSession } from "../Session";
import NoMessages from "./NoMessages";
import { Messages } from "./Messages";
import { useCallback, useState } from "react";

const SessionView = () => {
  const session = useSession();

  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const copyJoinLink = useCallback(async () => {
    const joinLink = `https://t.me/iu_feedback_bot?start=${session.id}`;
    await navigator.clipboard.writeText(joinLink);
    setHasCopiedLink(true);
  }, [session.id]);

  return (
    <>
      <header className="sessionView_header">
        <h1 className="sessionView_name">{session.name}</h1>
        <div className="sessionView_controls">
          {hasCopiedLink && (
            <p
              className="sessionView_linkCopied"
              onAnimationEnd={() => setHasCopiedLink(false)}
            >
              Link copied
            </p>
          )}
          <Button onClick={copyJoinLink}>Copy join link</Button>
          <Button color="red">Close the session</Button>
        </div>
      </header>
      <main className="sessionView_content">
        <Connected />
        {session.messages.length === 0 && <NoMessages />}
        {session.messages.length > 0 && (
          <Messages
            messages={session.messages}
            recentMessages={session.recentMessages}
            onDatedMessage={session.removeRecentMessage}
          />
        )}
      </main>
    </>
  );
};

export default SessionView;
