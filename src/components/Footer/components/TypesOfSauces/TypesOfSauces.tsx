import * as React from "react";
import { useSelector } from "react-redux";

import List from "../../../List/List";
import { AppState } from "../../../../redux/configureStore";
import styled from "../../../../theme/styled-components";
import { DEFAULT_TYPES_OF_SAUCES } from "../../../../redux/sauces/types";

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

const TypesOfSauces: React.FC = () => {
  const { types } = useSelector((store: AppState) => store.sauces);

  const items = (types ?? DEFAULT_TYPES_OF_SAUCES).map((type, ind) => {
    return {
      link: `/sauces?limit=15&order=newest&page=1&type=${type}`,
      text: type,
      id: ind + "-" + type
    };
  });

  return <StyledList title="Type of Sauce" items={items} />;
};

export default TypesOfSauces;
