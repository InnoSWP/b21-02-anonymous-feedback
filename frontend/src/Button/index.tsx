import "./style.scss";

import classNames from "classnames";

interface Props {
  size?: `big` | `small`;
  color?: `main` | `iu` | `red`;
  type?: `button` | `submit`;
  tag?: `a` | `button`;
  isDisabled?: boolean;
  children: string;
}

const Button = ({
  size = `small`,
  color = `main`,
  type = `button`,
  isDisabled = false,
  children,
}: Props) => {
  const className = classNames(`button`, `-${size}`, `-${color}`);

  return (
    <button type={type} className={className} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
