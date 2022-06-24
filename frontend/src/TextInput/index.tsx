import "./style.scss";

import { ChangeEvent, useCallback } from "react";
import classNames from "classnames";

interface Props {
  value: string;
  onChange(newValue: string): void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const TextInput = ({
  value,
  onChange,
  placeholder,
  className,
  autoFocus,
}: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value),
    [onChange]
  );

  return (
    <input
      type="text"
      className={classNames("textInput", className)}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

export default TextInput;
