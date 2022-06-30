import "./style.scss";

import Button from "../../Button";
import Connection from "./Connection";
import { useSession } from "../Session";
import NoMessages from "./NoMessages";
import { Messages } from "./Messages";
import { useCallback, useState } from "react";
import useNotificationPermission from "./useNotificationPermission";
import { Navigate } from "react-router";
import { Session } from "../types";
import Rating from "./Rating";

interface Props {
  session: Session;
}

const SessionView = ({ session }: Props) => {
  const notificationPermission = useNotificationPermission();

  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const copyJoinLink = useCallback(async () => {
    const joinLink = `https://t.me/iu_feedback_bot?start=${session.id}`;
    await navigator.clipboard.writeText(joinLink);
    setHasCopiedLink(true);
  }, [session.id]);

  const handleClose = useCallback(() => {
    const hasConfirmed = window.confirm(
      `Are you sure you want to close the session?`
    );
    if (hasConfirmed) {
      session.close();
    }
  }, [session]);

  return (
    <>
      <header className="sessionView_header">
        <div className="sessionView_info">
          <h1 className="sessionView_name">{session.name}</h1>
          {session.averageRating !== null && (
            <div className="sessionView_rating">
              <Rating rating={session.averageRating} id="sessionAverage" />
              {session.averageRating.toFixed(1)}
            </div>
          )}
        </div>
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

const Guard = () => {
  const session = useSession();

  if (session.closed) {
    return <Navigate to="./closed" replace={true} />;
  }

  return <SessionView session={session} />;
};

export default Guard;
