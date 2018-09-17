import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../../../theme/styled-components";

const StyledUl = styled.ul`
  li {
    list-decoration-style: none;
  }
`;

interface FooterNavigationProps {}

const FooterNavigation: React.SFC<FooterNavigationProps> = props => {
  return (
    <div>
      <h6>Navigation</h6>
      <StyledUl>
        <li>
          <Link to="#">Home</Link>
        </li>
        <li>
          <Link to="#">All Sauces</Link>
        </li>
        <li>
          <Link to="#">Add Sauce</Link>
        </li>
        <li>
          <Link to="#">Register</Link>
        </li>
        <li>
          <Link to="#">Log</Link>
        </li>
      </StyledUl>
    </div>
  );
};

export default FooterNavigation;
