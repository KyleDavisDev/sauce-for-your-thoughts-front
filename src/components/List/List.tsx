import * as React from "react";
import * as shortid from "shortid";
import { Link } from "../Link/Link";

import { StyledDiv, StyledH5, StyledUl } from "./ListStyle";

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
              <Link href={item.link || "#"}>{item.text}</Link>
            </li>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};

export default List;
