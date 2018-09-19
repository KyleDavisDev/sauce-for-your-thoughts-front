import * as React from "react";

import List from "../List/List";

interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = props => {
  const items = [
    { link: "#", text: "Home" },
    { link: "#", text: "All Sauces" },
    { link: "#", text: "Add Sauce" },
    { link: "#", text: "Register" },
    { link: "#", text: "Log In" }
  ];
  return <List title="Navigation" items={items} />;
};

export default Navigation;
