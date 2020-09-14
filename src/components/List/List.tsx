import * as React from "react";

import { Link } from "../Link/Link";
import { StyledDiv, StyledH5, StyledUl } from "./ListStyle";

export interface ListProps {
  className?: string;
  title: string;
  items: Array<{
    link?: string;
    text: string;
    id: string;
  }>;
}

const List: React.FunctionComponent<ListProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <StyledH5>{props.title}</StyledH5>
      <StyledUl>
        {props.items.map(item => {
          return (
            <li key={item.id} id={item.id}>
              <Link href={item.link || "#"}>{item.text}</Link>
            </li>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};

export default List;
