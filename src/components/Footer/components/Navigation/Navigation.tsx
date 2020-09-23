import * as React from "react";

import List, { ListItem } from "../../../List/List";
import styled from "../../../../theme/styled-components";
import { casual } from "../../../../utils/testUtils/testUtils";

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
    { link: "/", text: "Home", id: casual.uuid },
    { link: "/sauces", text: "All Sauces", id: casual.uuid },
    { link: "/sauce/add", text: "Add Sauce", id: casual.uuid },
    { link: "/account/register", text: "Register", id: casual.uuid },
    { link: "/account/login", text: "Log In", id: casual.uuid }
  ];

  return <StyledList title="Navigation" items={items} />;
};

export default Navigation;
