import * as React from "react";
import styled from "styled-components";

import Title from "../Title/Title";
import Item from "../Item/Item";

const StyledTitle = styled(Title)`
  padding-bottom: 0px;
`;

export interface AccountProps {}

class Account extends React.PureComponent<AccountProps, any> {
  public render() {
    return (
      <div>
        <StyledTitle>Account</StyledTitle>
        <Item to="/account/settings">Settings</Item>
        <Item to="#">Profile (Coming Soon)</Item>
      </div>
    );
  }
}

export default Account;
