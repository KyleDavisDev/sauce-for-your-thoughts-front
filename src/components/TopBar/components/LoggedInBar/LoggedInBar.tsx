import * as React from "react";

import Menu from "../Menu/Menu";

import DropDown from "../Dropdown/Dropdown";
import Body from "../Body/Body";
import Toggle from "../Toggle/Toggle";

interface ILoggedInBarProps {}

const LoggedInBar: React.FunctionComponent<ILoggedInBarProps> = props => {
  return (
    <DropDown>
      <Toggle />
      <Body>
        <Menu />
      </Body>
    </DropDown>
  );
};

export default LoggedInBar;
