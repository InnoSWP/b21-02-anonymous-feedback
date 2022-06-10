import "./style.scss";

const Connected = () => {
  return (
    <svg className="connectedAnimation" viewBox="0 0 64 16">
      <circle className="connectedAnimation_dot" cx={8} cy={8} />
      <circle className="connectedAnimation_dot" cx={32} cy={8} />
      <circle className="connectedAnimation_dot" cx={56} cy={8} />
    </svg>
  );
};

export default Connected;
