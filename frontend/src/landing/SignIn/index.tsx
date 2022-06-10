import "./style.scss";

import Button from "../../Button";

const SignIn = () => {
  return (
    <>
      <h1 className="signIn_title">Anonymous Feedback</h1>
      <p className="signIn_description">
        Collect anonymous feedback from students during classes in real time
      </p>
      <Button>Create a guest session</Button>
    </>
  );
};

export default SignIn;
