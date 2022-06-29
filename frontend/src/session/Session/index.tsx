import { Outlet, useOutletContext, useParams } from "react-router";
import Wrapper from "../../Wrapper";
import "./style.scss";
import useManageSession from "../useManageSession";
import { Session as ISession } from "../useManageSession/types";

const Session = () => {
  const id = useParams().id!;
  const session = useManageSession(id);

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
