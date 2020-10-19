import * as React from "react";
import { useSelector } from "react-redux";

import styled from "../../../../../../theme/styled-components";
import { AppState } from "../../../../../../redux/configureStore";
import ProfileMenuItem from "./components/Profile/Profile";
import AccountMenuItem from "./components/AccountMenuItem/AccountMenuItem";
import HelpMenuItem from "./components/HelpMenuItem/HelpMenuItem";
import AdminMenuItem from "./components/AdminMenuItem/AdminMenuItem";
import Item from "./components/Item/Item";
import { StyledDiv, StyledUL } from "./MenuStyle";

export interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = props => {
  const isAdmin = useSelector((store: AppState) => store.users?.self?.isAdmin);

  return (
    <StyledDiv className={props.className}>
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
        {isAdmin && (
          <li>
            <AdminMenuItem />
          </li>
        )}
        <hr style={{ margin: 0 }} />
        <Item to="/account/logout">Logout</Item>
      </StyledUL>
    </StyledDiv>
  );
};
Menu.displayName = "Menu";

export default Menu;
