import "./style.scss";

import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  ForwardedRef,
} from "react";
import classNames from "classnames";

interface Props {
  value: string;
  onChange(newValue: string): void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export interface Ref {
  focus(): void;
}

const TextInput = (
  { value, onChange, placeholder, className, autoFocus }: Props,
  ref: ForwardedRef<Ref>
) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value),
    [onChange]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle<Ref, Ref>(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      className={classNames("textInput", className)}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

export default forwardRef(TextInput);
