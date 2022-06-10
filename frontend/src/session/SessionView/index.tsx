import "./style.scss";

import Button from "../../Button";

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
    </>
  );
};

export default SessionView;
