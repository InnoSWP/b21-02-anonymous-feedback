import { FormEvent, useCallback } from "react";
import Button from "../../Button";
import "./style.scss";

const NewSession = () => {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <header className="newSession_header">
        <h1 className="newSession_title">Create a guest session</h1>
      </header>
      <p className="newSession_help">
        Enter a name for your feedback session. Students will see it when
        joining.
      </p>
      <form className="newSession_form" onSubmit={handleSubmit}>
        <input className="newSession_name" type="text" />
        <Button type="submit">Create the session</Button>
      </form>
    </>
  );
};

export default NewSession;
