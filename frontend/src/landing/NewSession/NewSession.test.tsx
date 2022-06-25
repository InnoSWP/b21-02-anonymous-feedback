import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router";
import NewSession from ".";
import { CREATE_SESSION } from "./useCreateSession";

test(`can create a guest session`, async () => {
  const mocks = [
    {
      request: {
        query: CREATE_SESSION,
        variables: { name: "Test session" },
      },
      result: {
        data: { session: { id: 42 } },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/new-session"]}>
        <Routes>
          <Route path="/new-session" element={<NewSession />} />
          <Route path="/session/42" element={<div data-testid="session" />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

  const nameInput = screen.getByRole(`textbox`);
  fireEvent.change(nameInput, { target: { value: `Test session` } });

  const createButton = screen.getByRole(`button`, {
    name: /create the session/i,
  });
  fireEvent.click(createButton);

  await waitFor(() => {
    const sessionScreen = screen.getByTestId(`session`);
    expect(sessionScreen).toBeInTheDocument();
  });
});
