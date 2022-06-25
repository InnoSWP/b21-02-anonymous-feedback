import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import SignIn from ".";

test(`can go to session creation`, () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/new-session" element={<div data-testid="session" />} />
      </Routes>
    </MemoryRouter>
  );

  const createSessionButton = screen.getByRole(`link`, {
    name: /create a guest session/i,
  });
  fireEvent.click(createSessionButton);

  const creationScreen = screen.getByTestId(`session`);
  expect(creationScreen).toBeInTheDocument();
});
