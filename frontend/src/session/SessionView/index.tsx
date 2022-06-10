import "./style.scss";

import Button from "../../Button";
import Connected from "./Connected";

const SessionView = () => {
  return (
    <>
      <header className="sessionView_header">
        <h1 className="sessionView_name">DSA Lab</h1>
        <div className="sessionView_controls">
          <Button>Copy join link</Button>
          <Button color="red">Close the session</Button>
        </div>
      </header>
      <main className="sessionView_content">
        <Connected />
      </main>
    </>
  );
};

export default SessionView;
