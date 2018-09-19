import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  max-width: 300px;
`;

const StyledH5 = styled.h5`
  margin: 0.5em 0;
  font-weight: 400;
  padding: 0;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleH5};
`;

const StyledUl = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;

  li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.white};
`;

interface Item {
  link?: string;
  text: string;
}

interface ListProps {
  className?: string;
  title: string;
  items: Item[];
}

const List: React.SFC<ListProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <StyledH5>{props.title}</StyledH5>
      <StyledUl>
        {props.items.map(item => {
          return (
            <li>
              <StyledLink to={item.link || "#"}>{item.text}</StyledLink>
            </li>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};

export default List;
