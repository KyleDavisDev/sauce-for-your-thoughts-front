import * as React from "react";

import List from "../../../List/List";
import styled from "styled-components";

const StyledList = styled(List)`
  h5,
  a {
    color: ${x => x.theme.white};
  }
`;

class Navigation extends React.PureComponent {
  private items = [
    { link: "/", text: "Home" },
    { link: "/sauces", text: "All Sauces" },
    { link: "/sauce/add", text: "Add Sauce" },
    { link: "/account/register", text: "Register" },
    { link: "/account/login", text: "Log In" }
  ];

  public render() {
    return <StyledList title="Navigation" items={this.items} />;
  }
}

export default Navigation;
