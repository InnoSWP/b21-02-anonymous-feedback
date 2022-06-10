import "./style.scss";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
