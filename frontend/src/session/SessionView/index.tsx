import "./style.scss";

import Button from "../../Button";
import Connection from "./Connection";
import { useSession } from "../Session";
import NoMessages from "./NoMessages";
import { Messages } from "./Messages";
import { useCallback, useState } from "react";
import useNotificationPermission from "./useNotificationPermission";
import { useNavigate } from "react-router";

const SessionView = () => {
  const notificationPermission = useNotificationPermission();
  const session = useSession();
  const navigate = useNavigate();

  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const copyJoinLink = useCallback(async () => {
    const joinLink = `https://t.me/iu_feedback_bot?start=${session.id}`;
    await navigator.clipboard.writeText(joinLink);
    setHasCopiedLink(true);
  }, [session.id]);

  const handleClose = useCallback(() => {
    navigate(`./closed`, { replace: true });
  }, [navigate]);

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
          {notificationPermission.permission === `default` && (
            <Button onClick={notificationPermission.request} color="iu">
              Subscribe to notifications
            </Button>
          )}
          <Button color="red" onClick={handleClose}>
            Close the session
          </Button>
        </div>
      </header>
      <main className="sessionView_content">
        <Connection />
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
