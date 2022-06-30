import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import SessionView from ".";

// This is required because this file imports `csv-generate/sync`, which is an ESM module.
// Jest 27 does not know how to import such a module. Jest 28 does, but `npm` will never
// override Jest 27 with a newer version.
jest.mock(`../generateCsv`);

// @ts-expect-error This is only to avoid failing with `Notification is undefined`
window.Notification = {
  permission: `default`,
};

test(`displays a session`, () => {
  const session = {
    id: `42`,
    closed: null,
    name: `Test session`,
    messages: [
      {
        id: `1`,
        timestamp: new Date(),
        content: { text: `Test message` },
      },
    ],
    averageRating: null,
    recentMessages: new Set(),
    removeRecentMessage() {},
    close() {
      return new Promise(() => {});
    },
  };

  const Test = () => {
    return <Outlet context={session} />;
  };

  render(
    <MemoryRouter initialEntries={["/session/42"]}>
      <Routes>
        <Route path="/session/42" element={<Test />}>
          <Route index element={<SessionView />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const nameElement = screen.getByText(session.name);
  expect(nameElement).toBeInTheDocument();

  const messageElement = screen.getByText(session.messages[0].content.text);
  expect(messageElement).toBeInTheDocument();
});
