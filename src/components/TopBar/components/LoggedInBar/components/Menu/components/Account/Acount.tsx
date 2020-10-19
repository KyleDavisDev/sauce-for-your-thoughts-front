import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AccountProps {}

class Account extends React.PureComponent<AccountProps, any> {
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

export default Account;
