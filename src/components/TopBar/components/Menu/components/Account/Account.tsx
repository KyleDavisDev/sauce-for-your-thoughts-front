import * as React from "react";
import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AccountProps {}

class Account extends React.PureComponent<AccountProps, any> {
  public render() {
    return (
      <div>
        <Title>Account</Title>
        <Item to="#settings">Settings</Item>
        <Item to="#profile">Profile</Item>
      </div>
    );
  }
}

export default Account;
