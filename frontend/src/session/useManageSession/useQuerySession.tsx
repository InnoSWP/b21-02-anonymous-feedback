import { gql, useQuery } from "@apollo/client";
import { Session as RawSession } from "../../types";
import { Message, SessionInfo } from "../types";
import { processMessage, processTimestamp } from "../utils";

const SESSION_QUERY = gql`
  query ($id: ID!) {
    session(id: $id) {
      name
      created {
        timestamp
      }
      closed {
        timestamp
      }
      messages {
        id
        timestamp {
          timestamp
        }
        content {
          ... on Text {
            text
          }
          ... on Rating {
            rating
          }
        }
      }
    }
  }
`;

interface Result {
  session: Pick<RawSession, "name" | "created" | "closed" | "messages">;
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
    onCompleted({ session: { name, created, closed, messages: newMessages } }) {
      onMessages(newMessages.map(processMessage));
      onSessionInfo({
        id,
        created: processTimestamp(created),
        closed: closed && processTimestamp(closed),
        name,
      });
    },
  });
};

export default useQuerySession;
