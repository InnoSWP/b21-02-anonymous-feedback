import "./style.scss";

import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  color?: `main` | `iu` | `red`;
  isDisabled?: boolean;
  onClick(): void;
  children: ReactNode;
}

const IconButton = ({
  color = `main`,
  isDisabled = false,
  onClick,
  children,
}: Props) => {
  const className = classNames(`iconButton`, `-${color}`);

  return (
    <button
      type="button"
      className={className}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
