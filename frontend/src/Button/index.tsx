import "./style.scss";

import classNames from "classnames";
import { Link } from "react-router-dom";

interface PropsBase {
  size?: `big` | `small`;
  color?: `main` | `iu` | `red`;
  children: string;
}

interface ButtonProps extends PropsBase {
  isDisabled?: boolean;
  type?: `button` | `submit`;
}

interface LinkProps extends PropsBase {
  to: string;
}

type Props = ButtonProps | LinkProps;

const Button = (props: Props) => {
  const { size = `small`, color = `main`, children } = props;
  const className = classNames(`button`, `-${size}`, `-${color}`);

  if (`to` in props) {
    return (
      <Link to={props.to} className={className}>
        {children}
      </Link>
    );
  }

  const { type, isDisabled = false } = props;
  return (
    <button type={type} className={className} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
