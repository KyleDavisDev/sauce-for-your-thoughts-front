import * as React from "react";

import List from "../List/List";

class Types extends React.PureComponent {
  private items = [
    { link: "#", text: "Hot Sauce" },
    { link: "#", text: "BBQ" },
    { link: "#", text: "Gravy" },
    { link: "#", text: "Marinade" },
    { link: "#", text: "Salsa" },
    { link: "#", text: "Meat" }
  ];

  public render() {
    return <List title="Type of Sauce" items={this.items} />;
  }
}

export default Types;
