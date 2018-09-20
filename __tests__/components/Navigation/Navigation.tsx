import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../theme/styled-components";
import LogoSFYT from "../../images/icons/LogoSFYT";

const Header = styled.header`
  background-color: ${x => x.theme.primaryThemeColor};
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  svg {
    fill: ${x => x.theme.navigationIconColor};
    width: 113px;
    height: 42px;
  }
`;

const Ul = styled.ul`
  list-decoration: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;

  li {
    display: inline-block;
  }
`;

const StyledLink = styled(Link)`
  color: ${x => x.theme.navigationTextColor};
  text-decoration: none;
  margin-right: 0.5em;
  padding: 0.5em;
  font-size: 1.25em;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const Bar = styled.div`
  display: inline;
  margin-left: 0.25em;
  margin-right 0.25em;
  content: " ";
  border-left: 0.5px solid #fff;
  border-right: 0.5px solid #fff;
  height: 100%;
`;

const Navigation: React.SFC<{}> = props => {
  return (
    <Header>
      <LogoSFYT />
      <Ul>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/sauces">Sauces</StyledLink>
        </li>
        <li>
          <StyledLink to="/addsauce">Add Sauce</StyledLink>
        </li>
        <Bar />
        <li>
          <span>icon here</span>
        </li>
      </Ul>
    </Header>
  );
};

export default Navigation;
