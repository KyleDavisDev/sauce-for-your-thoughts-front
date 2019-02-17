import * as React from "react";
import { Link } from "../../../../../Link/Link";
import styled from "styled-components";

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

interface ItemProps {
  to?: string;
  children: string;
  onClick?: (event: any) => void;
}

const Item: React.SFC<ItemProps> = props => {
  return (
    <StyledDiv onClick={props.onClick}>
      <Link to={props.to || "#"}>{props.children}</Link>
    </StyledDiv>
  );
};

export default Item;
