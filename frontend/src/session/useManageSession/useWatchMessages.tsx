import { gql, useSubscription } from "@apollo/client";
import { Message } from "./types";
import { Message as RawMessage } from "../../types";
import { processMessage } from "./utils";

const SUBSCRIPTION = gql`
  subscription ($id: ID!) {
    message: watchSession(id: $id) {
      id
      text
      timestamp {
        timestamp
      }
    }
  }
`;

interface Result {
  message: RawMessage;
}

interface Variables {
  id: string;
}

interface Props {
  id: string;
  onNewMessage(message: Message): void;
}

const useWatchMessages = ({ id, onNewMessage }: Props) => {
  useSubscription<Result, Variables>(SUBSCRIPTION, {
    variables: { id },
    onSubscriptionData({ subscriptionData: { data, error } }) {
      if (error) {
        throw error;
      }

      const message = processMessage(data!.message);
      onNewMessage(message);
    },
  });
};

export default useWatchMessages;
