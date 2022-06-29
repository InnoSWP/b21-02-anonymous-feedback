import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { Session } from "../../types";
import { processTimestamp } from "./utils";

const CLOSE_SESSION = gql`
  mutation ($id: ID!) {
    session: closeSession(id: $id) {
      closed {
        timestamp
      }
    }
  }
`;

interface Result {
  session: Pick<Session, "closed">;
}

interface Variables {
  id: string;
}

interface Props {
  id: string;
}

const useCloseSession = ({ id }: Props) => {
  const [closeSession] = useMutation<Result, Variables>(CLOSE_SESSION, {
    variables: { id },
  });

  return useCallback(async () => {
    const { data, errors } = await closeSession();
    if (errors) {
      throw errors[0];
    }

    return processTimestamp(data!.session.closed!);
  }, [closeSession]);
};

export default useCloseSession;
