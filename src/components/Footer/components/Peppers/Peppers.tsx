import * as React from "react";

import List from "../List/List";

class Peppers extends React.PureComponent {
  private items = [
    { link: "#", text: "Arbol" },
    { link: "#", text: "Ghost Chili" },
    { link: "#", text: "Cayenne" },
    { link: "#", text: "Chipotle" },
    { link: "#", text: "Fatali" },
    { link: "#", text: "Peri Peri" },
    { link: "#", text: "Piquin" },
    { link: "#", text: "Scotch Bonnet" },
    { link: "#", text: "Tobasco" },
    { link: "#", text: "Trinidad Scorpion" }
  ];

  public render() {
    return <List title="By Pepper" items={this.items} />;
  }
}

export default Peppers;
