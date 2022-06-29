import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { subSeconds } from "date-fns";
import Message from ".";

test(`shows message text`, () => {
  const message = {
    id: `1`,
    timestamp: new Date(),
    content: { text: `Test message` },
  };

  const handleDated = jest.fn();
  render(<Message message={message} isRecent={false} onDated={handleDated} />);

  const messageElement = screen.getByText(message.content.text);
  expect(messageElement).toBeInTheDocument();
});

test(`shows message age`, () => {
  const message = {
    id: `1`,
    timestamp: subSeconds(Date.now(), 7),
    content: { text: `Test message` },
  };

  const handleDated = jest.fn();
  render(<Message message={message} isRecent={false} onDated={handleDated} />);

  const ageElement = screen.getByText(/less than 10 seconds ago/i);
  expect(ageElement).toBeInTheDocument();
});
