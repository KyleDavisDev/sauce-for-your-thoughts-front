import * as React from "react";

import UserDropdown from "./components/UserDropdown/UserDropdown";

interface ILoggedInBarProps {}

const LoggedInBar: React.FunctionComponent<ILoggedInBarProps> = () => {
  return (
    <>
      <UserDropdown />
    </>
  );
};

export default LoggedInBar;
