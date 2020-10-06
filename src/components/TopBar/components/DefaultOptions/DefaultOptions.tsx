import * as React from "react";

import LoginIcon from "../../../../images/icons/LoginIcon";
import UserIcon from "../../../../images/icons/UserIcon";
import { StyledDiv, StyledLink } from "../../TopBarStyle";

interface IDefaultOptionsProps {}

const DefaultOptions: React.FunctionComponent<IDefaultOptionsProps> = props => {
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

export default DefaultOptions;
