import "./style.scss";

const NoMessages = () => {
  return (
    <div className="noMessages">
      <p className="noMessages_text">Students haven’t given any feedback yet</p>
      <p className="noMessages_help">
        Whenever a student gives their feedback, it will appear here
      </p>
    </div>
  );
};

export default NoMessages;
