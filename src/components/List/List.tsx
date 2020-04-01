import * as React from "react";
import * as shortid from "shortid";

import { StyledDiv, StyledH5, StyledLink, StyledUl } from "./ListStyle";

interface ListProps {
  className?: string;
  title: string;
  items: Array<{
    link?: string;
    text: string;
  }>;
}

const List: React.FunctionComponent<ListProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <StyledH5>{props.title}</StyledH5>
      <StyledUl>
        {props.items.map(item => {
          return (
            <li key={shortid.generate()}>
              <StyledLink to={item.link || "#"}>{item.text}</StyledLink>
            </li>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};

export default List;
