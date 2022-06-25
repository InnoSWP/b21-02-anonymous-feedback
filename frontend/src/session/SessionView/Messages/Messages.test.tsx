import { render, screen } from "@testing-library/react";
import { Messages } from ".";

test(`shows messages`, () => {
  const messages = [
    { id: `1`, text: `Test 1`, timestamp: new Date() },
    { id: `2`, text: `Test 2`, timestamp: new Date() },
  ];

  const handleDatedMessage = jest.fn();
  render(
    <Messages
      messages={messages}
      recentMessages={new Set()}
      onDatedMessage={handleDatedMessage}
    />
  );

  const messageElements = screen.getAllByText(/test/i);
  expect(messageElements).toHaveLength(messages.length);
});
