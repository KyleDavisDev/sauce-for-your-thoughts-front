import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/configureStore";
import LoggedInOptions from "./components/LoggedInOptions/LoggedInOptions";
import DefaultOptions from "./components/DefaultOptions/DefaultOptions";

const TopBar: React.FC = () => {
  const { self } = useSelector((state: AppState) => {
    return state.users;
  });
  const { displayName, avatarURL } = self;
  const isLoggedIn = !!self.token;

  return (
    <header>
      {isLoggedIn && displayName && avatarURL ? (
        <LoggedInOptions displayName={displayName} avatarURL={avatarURL} />
      ) : (
        <DefaultOptions />
      )}
    </header>
  );
};

export default TopBar;
