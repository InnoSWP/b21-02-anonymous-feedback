import { SessionInfo, Message } from "./types";

import notificationSound from "./notification.wav";

const notify = (session: SessionInfo, message: Message) => {
  if (Notification.permission !== `granted`) {
    return;
  }

  const sound = new Audio(notificationSound);
  sound.play();

  if (document.hasFocus()) {
    return;
  }

  new Notification(`New feedback in ${session.name}`, { body: message.text });
};

export default notify;
