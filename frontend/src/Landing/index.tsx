import { ReactNode } from "react";
import Wrapper from "../Wrapper";
import "./style.scss";

interface Props {
  children: ReactNode;
}

const Landing = ({ children }: Props) => {
  return (
    <div className="landing">
      <Wrapper>
        <main className="landing_content">{children}</main>
      </Wrapper>
    </div>
  );
};

export default Landing;
