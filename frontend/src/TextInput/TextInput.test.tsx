import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import TextInput, { Ref as TextInputRef } from ".";

test(`shows value`, () => {
  const handleChange = jest.fn();
  render(<TextInput value="test" onChange={handleChange} />);

  const input = screen.getByDisplayValue(`test`);
  expect(input).toBeInTheDocument();
});

test(`shows placeholder`, () => {
  const handleChange = jest.fn();
  render(
    <TextInput value="" onChange={handleChange} placeholder="placeholder" />
  );

  const input = screen.getByPlaceholderText(`placeholder`);
  expect(input).toBeInTheDocument();
});

test(`can handle edited text`, () => {
  const handleChange = jest.fn();
  render(<TextInput value="test" onChange={handleChange} />);

  const input = screen.getByRole(`textbox`);
  fireEvent.change(input, { target: { value: `foobar` } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});

test(`respects autoFocus`, () => {
  const handleChange = jest.fn();
  render(<TextInput value="test" onChange={handleChange} autoFocus={true} />);
  {
    const input = screen.getByRole(`textbox`);
    expect(document.activeElement).toBe(input);
  }

  cleanup();

  render(<TextInput value="test" onChange={handleChange} autoFocus={false} />);
  {
    const input = screen.getByRole(`textbox`);
    expect(document.activeElement).not.toBe(input);
  }
});

test(`can focus programmatically`, () => {
  const handleChange = jest.fn();
  const Test = () => {
    const inputRef = useRef<TextInputRef>(null);
    const focusInput = () => {
      inputRef.current?.focus();
    };
    const highlightInput = () => {
      inputRef.current?.highlightAndFocus();
    };

    return (
      <>
        <button onClick={focusInput}>Focus the input</button>
        <button onClick={highlightInput}>Highlight the input</button>
        <TextInput ref={inputRef} value="test" onChange={handleChange} />
      </>
    );
  };

  render(<Test />);
  const focusButton = screen.getByRole(`button`, { name: /focus/i });
  const highlightButton = screen.getByRole(`button`, { name: /highlight/i });
  const input = screen.getByRole(`textbox`);

  expect(document.activeElement).not.toBe(input);
  fireEvent.click(focusButton);
  expect(document.activeElement).toBe(input);

  fireEvent.blur(input);
  fireEvent.click(highlightButton);
  expect(document.activeElement).toBe(input);
});
