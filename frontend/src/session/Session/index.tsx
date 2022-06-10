import { Outlet, useOutletContext, useParams } from "react-router";
import Wrapper from "../../Wrapper";
import "./style.scss";
import useWatchSession, { Session as ISession } from "./useSession";

const Session = () => {
  const id = useParams().id!;
  const session = useWatchSession(id);

  return (
    <div className="session">
      <Wrapper>{session && <Outlet context={session} />}</Wrapper>
    </div>
  );
};

export const useSession = () => {
  return useOutletContext<ISession>();
};

export default Session;
