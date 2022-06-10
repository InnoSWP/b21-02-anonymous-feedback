import { Outlet, useOutletContext } from "react-router";
import { Session as ISession } from "../../types";
import Wrapper from "../../Wrapper";
import "./style.scss";

const Session = () => {
  const session: ISession = {
    id: `1`,
    name: `DSA Lab`,
    created: { timestamp: `2022-06-10T11:23:41.761Z` },
    messages: [],
  };

  return (
    <div className="session">
      <Wrapper>
        <Outlet context={session} />
      </Wrapper>
    </div>
  );
};

export const useSession = () => {
  return useOutletContext<ISession>();
};

export default Session;
