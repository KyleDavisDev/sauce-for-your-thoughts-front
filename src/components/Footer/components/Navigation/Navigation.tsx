import * as React from "react";

import List, { ListItem } from "../../../List/List";
import styled from "../../../../theme/styled-components";

const StyledList = styled(List)`
  h5,
  a {
    color: ${x => x.theme.white};
  }

  a:hover {
    color: ${x => x.theme.secondaryThemeColor};
  }
`;
StyledList.displayName = "List";

const Navigation: React.FunctionComponent = () => {
  const items: ListItem[] = [
    { link: "/", text: "Home", id: "Home" },
    { link: "/sauces", text: "All Sauces", id: "All_Sauces" },
    { link: "/sauce/add", text: "Add Sauce", id: "Add_Sauces" },
    { link: "/account/register", text: "Register", id: "Register" },
    { link: "/account/login", text: "Log In", id: "Log_In" }
  ];

  return <StyledList title="Navigation" items={items} />;
};

export default Navigation;
