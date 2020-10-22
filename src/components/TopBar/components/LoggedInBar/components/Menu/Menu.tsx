import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../../../../../redux/configureStore";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";
import Help from "./components/Help/Help";
import Admin from "./components/Admin/Admin";
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
          <Profile />
        </li>
        <li>
          <Account />
        </li>
        <li>
          <Help />
        </li>
        {isAdmin && (
          <li>
            <Admin />
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
