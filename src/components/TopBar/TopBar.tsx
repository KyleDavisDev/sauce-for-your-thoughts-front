import * as React from "react";
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

const Link = styled.a`
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
      <Link href="/register">
        <UserIcon />
        Register
      </Link>
      <Link href="/login">
        <LoginIcon />
        Log in
      </Link>
    </Div>
  );
};
TopBar.defaultProps = {
  isLoggedIn: false
};

export default TopBar;
