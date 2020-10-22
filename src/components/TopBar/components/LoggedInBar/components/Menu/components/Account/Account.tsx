import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AccountProps {}

const Account: React.FC<AccountProps> = props => {
  return (
    <>
      <Title>Account</Title>
      <Item to="/account/settings">Settings</Item>
      <Item to="#">Profile (Coming Soon)</Item>
    </>
  );
};

export default Account;
