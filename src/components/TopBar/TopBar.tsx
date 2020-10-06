import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/configureStore";
import LoggedInBar from "./components/LoggedInBar/LoggedInBar";
import LoggedOutBar from "./components/LoggedOutBar/LoggedOutBar";

const TopBar: React.FC = () => {
  const { self } = useSelector((state: AppState) => {
    return state.users;
  });
  const { displayName, avatarURL } = self;
  const isLoggedIn = !!self.token;

  return (
    <header>
      {isLoggedIn && displayName && avatarURL ? (
        <LoggedInBar displayName={displayName} avatarURL={avatarURL} />
      ) : (
        <LoggedOutBar />
      )}
    </header>
  );
};

export default TopBar;
