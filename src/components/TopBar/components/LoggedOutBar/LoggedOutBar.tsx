import * as React from "react";

import LoginIcon from "../../../../images/icons/LoginIcon";
import UserIcon from "../../../../images/icons/UserIcon";
import { StyledDiv, StyledLink } from "../../TopBarStyle";

interface ILoggedOutBarProps {}

const LoggedOutBar: React.FunctionComponent<ILoggedOutBarProps> = props => {
  return (
    <StyledDiv>
      <StyledLink href="/account/register">
        <UserIcon />
        Register
      </StyledLink>
      <StyledLink href="/account/login">
        <LoginIcon />
        Log in
      </StyledLink>
    </StyledDiv>
  );
};

export default LoggedOutBar;
