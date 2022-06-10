import { Outlet, useOutletContext } from "react-router";
import { Session as ISession } from "../../types";
import Wrapper from "../../Wrapper";
import "./style.scss";

const Session = () => {
  const session: ISession = {
    id: `1`,
    name: `DSA Lab`,
    created: { timestamp: `2022-06-10T11:23:41.761Z` },
    messages: [
      {
        id: `1`,
        message: `Shouldn’t it be 2 at the top instead of 3?`,
        timestamp: { timestamp: `2022-06-10T11:23:41.761Z` },
      },
      {
        id: `2`,
        message: `Can you go back to the previous slide?`,
        timestamp: { timestamp: `2022-06-10T11:23:41.761Z` },
      },
      {
        id: `3`,
        message: `Bad sound in Zoom`,
        timestamp: { timestamp: `2022-06-10T11:23:41.761Z` },
      },
    ],
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
