import * as React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { AppState } from "../../../../redux/configureStore";
import ProfileMenuItem from "./components/ProfileMenuItem/ProfileMenuItem";
import AccountMenuItem from "./components/AccountMenuItem/AccountMenuItem";
import HelpMenuItem from "./components/HelpMenuItem/HelpMenuItem";
import AdminMenuItem from "./components/AdminMenuItem/AdminMenuItem";
import Item from "./components/Item/Item";
import Auth from "../../../../utils/Auth/Auth";
import { logout } from "../../../../redux/users/actions";

const StyledUL = styled.ul`
  max-height: calc(100vh - 52px - 16px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 275px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.white};
  list-style: none;
  padding: 0;
  line-height: initial;
`;

export interface MenuProps {
  logout: () => void;
  isAdmin: boolean;
}

class Menu extends React.Component<MenuProps, any> {
  public render() {
    return (
      <StyledUL>
        <li>
          <ProfileMenuItem />
        </li>
        <li>
          <AccountMenuItem />
        </li>
        <li>
          <HelpMenuItem />
        </li>
        {this.props.isAdmin && (
          <li>
            <AdminMenuItem />
          </li>
        )}
        <hr style={{ margin: 0 }} />
        <Item onClick={this.logout}>Logout</Item>
      </StyledUL>
    );
  }

  private logout = (event: any) => {
    // logout w/ redux
    this.props.logout();

    // Remove key from localStorage if exists
    Auth.deauthenticateUser();
  };
}

const mapState2Props = (state: AppState) => {
  return { isAdmin: state.users.self.isAdmin || false };
};

const mapDispatch2Props = { logout };

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Menu);
