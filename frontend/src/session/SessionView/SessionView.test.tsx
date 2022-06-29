import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import SessionView from ".";
import { Session } from "../useManageSession/types";

// @ts-expect-error This is only to avoid failing with `Notification is undefined`
window.Notification = {
  permission: `default`,
};

test(`displays a session`, () => {
  const session: Session = {
    id: `42`,
    closed: null,
    name: `Test session`,
    messages: [
      {
        id: `1`,
        text: `Test message`,
        timestamp: new Date(),
      },
    ],
    recentMessages: new Set(),
    removeRecentMessage() {},
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

  const messageElement = screen.getByText(session.messages[0].text);
  expect(messageElement).toBeInTheDocument();
});
