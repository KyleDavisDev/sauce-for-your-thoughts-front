import * as React from "react";

import DropDown from "../../../Dropdown/Dropdown";
import Toggle from "./components/Toggle/Toggle";
import Menu from "./components/Menu/Menu";

interface ILoggedInBarProps {}

const LoggedInBar: React.FunctionComponent<ILoggedInBarProps> = props => {
  return (
    <DropDown>
      <Toggle />
      <Menu />
    </DropDown>
  );
};

export default LoggedInBar;
