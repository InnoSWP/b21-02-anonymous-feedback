import "./style.scss";

import { FormEvent, useCallback, useState } from "react";
import Button from "../../Button";
import IconButton from "../../IconButton";
import { ReactComponent as BackIcon } from "../../icons/backArrow.svg";
import { useNavigate } from "react-router";
import TextInput from "../../TextInput";
import useCreateSession from "./useCreateSession";

const NewSession = () => {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  const [name, setName] = useState(``);
  const createSession = useCreateSession();
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const id = await createSession(name);
      navigate(`/session/${id}`);
    },
    [createSession, name, navigate]
  );

  return (
    <>
      <header className="newSession_header">
        <IconButton onClick={goBack}>
          <BackIcon />
        </IconButton>
        <h1 className="newSession_title">Create a guest session</h1>
      </header>
      <p className="newSession_help">
        Enter a name for your feedback session. Students will see it when
        joining.
      </p>
      <form className="newSession_form" onSubmit={handleSubmit}>
        <TextInput
          className="newSession_name"
          value={name}
          onChange={setName}
          placeholder="DSA Lab"
        />
        <Button type="submit">Create the session</Button>
      </form>
    </>
  );
};

export default NewSession;
