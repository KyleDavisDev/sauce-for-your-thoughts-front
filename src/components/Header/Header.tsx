import * as React from "react";
import styled from "../../theme/styled-components";

// User icon
import UserIcon from "../../images/icons/UserIcon";

export interface HeaderProps {
  isLoggedIn?: boolean;
}

const Div = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const A = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.SFC<HeaderProps> = props => {
  return (
    <Div>
      <A href="/register">
        <UserIcon />
        Register
      </A>
    </Div>
  );
};
Header.defaultProps = {
  isLoggedIn: false
};

export default Header;
