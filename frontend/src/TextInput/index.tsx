import "./style.scss";

import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  ForwardedRef,
  useState,
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
  highlightAndFocus(): void;
}

const TextInput = (
  {
    value,
    onChange,
    placeholder,
    className: additionalClasssName,
    autoFocus,
  }: Props,
  ref: ForwardedRef<Ref>
) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value),
    [onChange]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const [isShaking, setIsShaking] = useState(false);
  const onShakeEnd = useCallback(() => setIsShaking(false), []);

  useImperativeHandle<Ref, Ref>(ref, () => ({
    focus: () => inputRef.current?.focus(),
    highlightAndFocus() {
      setIsShaking(true);
      this.focus();
    },
  }));

  const className = classNames(`textInput`, additionalClasssName, {
    "-shake": isShaking,
  });

  return (
    <input
      ref={inputRef}
      type="text"
      className={className}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onAnimationEnd={onShakeEnd}
    />
  );
};

export default forwardRef(TextInput);
