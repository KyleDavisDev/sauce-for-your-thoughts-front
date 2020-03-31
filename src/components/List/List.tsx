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

class List extends React.PureComponent<ListProps> {
  public render() {
    return (
      <StyledDiv className={this.props.className}>
        <StyledH5>{this.props.title}</StyledH5>
        <StyledUl>
          {this.props.items.map(item => {
            return (
              <li key={shortid.generate()}>
                <StyledLink to={item.link || "#"}>{item.text}</StyledLink>
              </li>
            );
          })}
        </StyledUl>
      </StyledDiv>
    );
  }
}

export default List;
