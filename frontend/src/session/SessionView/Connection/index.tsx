import classNames from "classnames";
import useConnectionStatus from "../../../client/useConnectionStatus";
import "./style.scss";

const Connection = () => {
  const connectionStatus = useConnectionStatus();

  const isAnimating = connectionStatus === `connected`;
  const hasError =
    connectionStatus === `disconnected` || connectionStatus === `error`;

  const className = classNames("connectionAnimation", {
    "-animating": isAnimating,
    "-error": hasError,
  });

  return (
    <div className="connection">
      <svg className={className} viewBox="0 0 64 16">
        <circle className="connectionAnimation_dot" cx={8} cy={8} />
        <circle className="connectionAnimation_dot" cx={32} cy={8} />
        <circle className="connectionAnimation_dot" cx={56} cy={8} />
      </svg>
      {connectionStatus === `error` && (
        <p className="connection_error">
          An error occured. Please reload the page
        </p>
      )}
      {connectionStatus === `disconnected` && (
        <p className="connection_error">
          Cannot load new messages. Check your internet connection
        </p>
      )}
    </div>
  );
};

export default Connection;
