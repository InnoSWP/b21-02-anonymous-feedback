import { SessionInfo, Message } from "./useSession";

import notificationSound from "./notification.ogg";

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
