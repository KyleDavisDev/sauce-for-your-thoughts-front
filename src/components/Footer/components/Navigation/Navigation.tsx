import * as React from "react";

import List from "../List/List";

class Navigation extends React.PureComponent {
  private items = [
    { link: "#", text: "Home" },
    { link: "#", text: "All Sauces" },
    { link: "#", text: "Add Sauce" },
    { link: "#", text: "Register" },
    { link: "#", text: "Log In" }
  ];

  public render() {
    return <List title="Navigation" items={this.items} />;
  }
}

export default Navigation;
