import "./style.scss";

import { Navigate, Route, Routes } from "react-router";
import SignIn from "../landing/SignIn";
import Landing from "../landing/Landing";
import NewSession from "../landing/NewSession";
import Session from "../session/Session";
import SessionView from "../session/SessionView";
import SessionClosed from "../session/SessionClosed";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<SignIn />} />
        <Route path="new-session" element={<NewSession />} />
      </Route>
      <Route path="/session/:id" element={<Session />}>
        <Route index element={<SessionView />} />
        <Route path="closed" element={<SessionClosed />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

export default App;
