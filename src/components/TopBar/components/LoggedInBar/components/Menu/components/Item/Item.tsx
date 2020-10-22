import * as React from "react";
import { Link } from "../../../../../../../Link/Link";
import styled from "../../../../../../../../theme/styled-components";

const StyledDiv = styled.div`
  display: inline-block;
  width: 100%;

  a {
    padding: 8px 12px;
    width: 100%;
    display: block;
    color: ${x => x.theme.primaryThemeColor};
    &:hover,
    &:focus {
      background-color: ${x => x.theme.primaryLightThemeColor};
      color: ${x => x.theme.primaryThemeColor};
    }
  }
`;

export interface ItemProps {
  to?: string;
  children: string;
  onClick?: (event: any) => void;
}

const Item: React.SFC<ItemProps> = props => {
  const _defaultPath = "#";

  return (
    <StyledDiv onClick={props.onClick}>
      <Link href={props.to || _defaultPath}>{props.children}</Link>
    </StyledDiv>
  );
};

export default Item;
