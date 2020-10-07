import * as React from "react";

import LoginIcon from "../../../../images/icons/LoginIcon";
import UserIcon from "../../../../images/icons/UserIcon";
import { StyledLink } from "./LoggedOutBarStyle";

interface ILoggedOutBarProps {}

const LoggedOutBar: React.FunctionComponent<ILoggedOutBarProps> = props => {
  return (
    <>
      <StyledLink href="/account/register">
        <UserIcon />
        Register
      </StyledLink>
      <StyledLink href="/account/login">
        <LoginIcon />
        Log in
      </StyledLink>
    </>
  );
};

export default LoggedOutBar;
