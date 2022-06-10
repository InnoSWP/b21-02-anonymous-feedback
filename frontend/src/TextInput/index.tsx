import "./style.scss";

import { ChangeEvent, useCallback } from "react";
import classNames from "classnames";

interface Props {
  value: string;
  onChange(newValue: string): void;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ value, onChange, placeholder, className }: Props) => {
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
    />
  );
};

export default TextInput;
