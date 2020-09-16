import * as React from "react";
import { useSelector } from "react-redux";

import List from "../../../List/List";
import { AppState } from "../../../../redux/configureStore";
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

const TypesOfSauces: React.FC = () => {
  const items = useSelector((store: AppState) => store.sauces.types).map(
    type => {
      return {
        link: `/sauces?limit=15&order=newest&page=1&type=${type}`,
        text: type,
        id: type
      };
    }
  );

  return <StyledList title="Type of Sauce" items={items} />;
};

export default TypesOfSauces;
