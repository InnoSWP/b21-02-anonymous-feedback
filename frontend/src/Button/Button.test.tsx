import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Button from ".";

test(`the text is rendered`, () => {
  render(<Button onClick={jest.fn()}>A button</Button>);

  const button = screen.getByText(`A button`);
  expect(button).toBeInTheDocument();
});

test(`can click an active button`, () => {
  const handleClick = jest.fn();
  render(
    <Button onClick={handleClick} isDisabled={false}>
      A button
    </Button>
  );

  const button = screen.getByRole(`button`);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test(`cannot click a disabled button`, () => {
  const handleClick = jest.fn();
  render(
    <Button onClick={handleClick} isDisabled={true}>
      A button
    </Button>
  );

  const button = screen.getByRole(`button`);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(0);
});

test(`works as a link button`, () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Button to="/foo">A button</Button>} />
        <Route path="/foo" element={<div data-testid="foo" />} />
      </Routes>
    </MemoryRouter>
  );

  const button = screen.getByRole(`link`);
  fireEvent.click(button);
  const div = screen.getByTestId(`foo`);
  expect(div).toBeInTheDocument();
});
