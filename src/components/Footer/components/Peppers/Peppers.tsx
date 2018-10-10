import * as React from "react";

import List from "../List/List";

interface PeppersProps {}

const Peppers: React.SFC<PeppersProps> = props => {
  const items = [
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
  return <List title="Peppers" items={items} />;
};

export default Peppers;
