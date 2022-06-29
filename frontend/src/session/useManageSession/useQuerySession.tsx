import { gql, useQuery } from "@apollo/client";
import { Session as RawSession } from "../../types";
import { Message, SessionInfo } from "./types";
import { processMessage } from "./utils";

const SESSION_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      name
      messages {
        id
        text
        timestamp {
          timestamp
        }
      }
    }
  }
`;

interface Result {
  session: Pick<RawSession, "name" | "messages">;
}

interface Variables {
  id: string;
}

interface Props {
  id: string;
  onMessages(messages: Message[]): void;
  onSessionInfo(sessionInfo: SessionInfo): void;
}

const useQuerySession = ({ id, onMessages, onSessionInfo }: Props) => {
  useQuery<Result, Variables>(SESSION_QUERY, {
    variables: { id },
    onCompleted({ session: { name, messages: newMessages } }) {
      onMessages(newMessages.map(processMessage));
      onSessionInfo({ id, name });
    },
  });
};

export default useQuerySession;
