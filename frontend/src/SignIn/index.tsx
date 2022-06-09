import "./style.scss";

import Landing from "../Landing";

const SignIn = () => {
  return (
    <Landing>
      <h1 className="signIn_title">Anonymous Feedback</h1>
      <p className="signIn_description">
        Collect anonymous feedback from students during classes in real time
      </p>
    </Landing>
  );
};

export default SignIn;
