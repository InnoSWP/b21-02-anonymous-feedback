import { Outlet } from "react-router";
import Wrapper from "../../Wrapper";
import "./style.scss";

const Session = () => {
  return (
    <div className="session">
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default Session;
