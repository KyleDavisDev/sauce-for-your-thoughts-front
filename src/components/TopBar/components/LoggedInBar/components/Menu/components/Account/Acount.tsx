import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AccountMenuItemProps {}

class AccountMenuItem extends React.PureComponent<AccountMenuItemProps, any> {
  public render() {
    return (
      <div>
        <Title>Account</Title>
        <Item to="/account/settings">Settings</Item>
        <Item to="#">Profile (Coming Soon)</Item>
      </div>
    );
  }
}

export default AccountMenuItem;
