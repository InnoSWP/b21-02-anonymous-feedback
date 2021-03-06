import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

export const CREATE_SESSION = gql`
  mutation ($name: String!) {
    session: createSession(name: $name) {
      id
    }
  }
`;

interface Variables {
  name: string;
}

interface Result {
  session: { id: string };
}

const useCreateSession = () => {
  const [createSession] = useMutation<Result, Variables>(CREATE_SESSION);

  return useCallback(
    async (name: string) => {
      const { data, errors } = await createSession({ variables: { name } });
      if (errors) {
        throw errors[0];
      }

      return data!.session.id;
    },
    [createSession]
  );
};

export default useCreateSession;
