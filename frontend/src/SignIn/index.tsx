import "./style.scss";

import Landing from "../Landing";
import Button from "../Button";

const SignIn = () => {
  return (
    <Landing>
      <h1 className="signIn_title">Anonymous Feedback</h1>
      <p className="signIn_description">
        Collect anonymous feedback from students during classes in real time
      </p>
      <Button>Create a guest session</Button>
    </Landing>
  );
};

export default SignIn;
