import * as React from "react";

import List from "../List/List";

interface TypesProps {}

const Types: React.SFC<TypesProps> = props => {
  const items = [
    { link: "#", text: "Hot Sauce" },
    { link: "#", text: "BBQ" },
    { link: "#", text: "Gravy" },
    { link: "#", text: "Marinade" },
    { link: "#", text: "Salsa" },
    { link: "#", text: "Meat" }
  ];
  return <List title="Types" items={items} />;
};

export default Types;
