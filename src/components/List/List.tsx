import * as React from "react";
import { Link } from "../Link/Link";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";

const StyledH5 = styled.h5`
  margin: 0.5em 0;
  font-weight: 400;
  padding: 0;
  text-transform: uppercase;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleH5};
`;
StyledH5.displayName = "StyledH5";

const StyledUl = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;

  li {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    padding-left: 0.75rem;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    li {
      padding-left: 0;
    }
  }
`;
StyledUl.displayName = "StyledUl";

const StyledLink = styled(Link)`
  color: ${props => props.theme.white};
  font-family: AvenirNextReg;

  &:hover,
  &:focus {
    color: ${props => props.theme.secondaryThemeColor};
  }
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

class List extends React.PureComponent<ListProps> {
  public render() {
    return (
      <div className={this.props.className}>
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
      </div>
    );
  }
}

export default List;
