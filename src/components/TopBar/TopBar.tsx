import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../theme/styled-components";

// SVG icons
import UserIcon from "../../images/icons/UserIcon";
import LoginIcon from "../../images/icons/LoginIcon";

export interface TopBarProps {
  isLoggedIn?: boolean;
}

const Div = styled.div`
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5em 0em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 2em;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.primaryColor};
    fill: ${x => x.theme.primaryColor};
  }
`;

const TopBar: React.SFC<TopBarProps> = props => {
  return (
    <Div>
      <StyledLink to="/register">
        <UserIcon />
        Register
      </StyledLink>
      <StyledLink to="/login">
        <LoginIcon />
        Log in
      </StyledLink>
    </Div>
  );
};
TopBar.defaultProps = {
  isLoggedIn: false
};

export default TopBar;
