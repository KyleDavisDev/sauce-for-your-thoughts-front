import * as React from "react";
import styled from "styled-components";
import Title from "../Title/Title";

export interface AccountProps {}

class Account extends React.PureComponent<AccountProps, any> {
  public render() {
    return (
      <div>
        <Title>Account</Title>
      </div>
    );
  }
}

export default Account;
