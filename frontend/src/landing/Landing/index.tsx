import "./style.scss";

import { Outlet } from "react-router";
import Wrapper from "../../Wrapper";

const Landing = () => {
  return (
    <div className="landing">
      <Wrapper>
        <main className="landing_content">
          <Outlet />
        </main>
      </Wrapper>
    </div>
  );
};

export default Landing;
