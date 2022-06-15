import { useCallback, useState } from "react";

type NotificationPermission =
  | { permission: `default`; request(): void }
  | { permission: `denied` | `granted` };

const useNotificationPermission = (): NotificationPermission => {
  const [permission, setPermission] = useState<
    NotificationPermission["permission"]
  >(Notification.permission);

  const request = useCallback(async () => {
    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);
  }, []);

  if (permission === `default`) {
    return { permission, request };
  }

  return { permission };
};

export default useNotificationPermission;
