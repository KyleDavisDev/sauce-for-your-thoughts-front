import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  max-width: 300px;
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

interface FooterNavigationProps {
  className?: string;
}

const FooterNavigation: React.SFC<FooterNavigationProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <h6>Navigation</h6>
      <StyledUl>
        <li>
          <StyledLink to="#">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="#">All Sauces</StyledLink>
        </li>
        <li>
          <StyledLink to="#">Add Sauce</StyledLink>
        </li>
        <li>
          <StyledLink to="#">Register</StyledLink>
        </li>
        <li>
          <StyledLink to="#">Log</StyledLink>
        </li>
      </StyledUl>
    </StyledDiv>
  );
};

export default FooterNavigation;
