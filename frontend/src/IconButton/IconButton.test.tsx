import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from ".";

test(`the icon is rendered`, () => {
  render(
    <IconButton onClick={jest.fn()}>
      <div data-testid="icon" />
    </IconButton>
  );

  const icon = screen.getByTestId(`icon`);
  expect(icon).toBeInTheDocument();
});

test(`can click an active icon button`, () => {
  const handleClick = jest.fn();
  render(
    <IconButton onClick={handleClick} isDisabled={false}>
      <div />
    </IconButton>
  );

  const button = screen.getByRole(`button`);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test(`cannot click a disabled icon button`, () => {
  const handleClick = jest.fn();
  render(
    <IconButton onClick={handleClick} isDisabled={true}>
      <div />
    </IconButton>
  );

  const button = screen.getByRole(`button`);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(0);
});
