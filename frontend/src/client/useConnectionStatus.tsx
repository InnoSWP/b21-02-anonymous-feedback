import { useCallback, useEffect, useState } from "react";
import { ConnectionStatus, connectionStatus } from "./webSocket";

const useConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>(
    connectionStatus.status
  );

  const handleChange = useCallback((newStatus: ConnectionStatus) => {
    setStatus(newStatus);
  }, []);

  useEffect(() => {
    connectionStatus.on(`change`, handleChange);
    return () => {
      connectionStatus.off(`change`, handleChange);
    };
  }, [handleChange]);

  return status;
};

export default useConnectionStatus;
