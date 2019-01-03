import * as React from "react";
import { Link } from "react-router-dom";

import styled from "../../theme/styled-components";
import LogoSFYT from "../../images/icons/LogoSFYT";
import { Button } from "../Button/Button";
import Bar from "../../images/icons/Bar";

const Header = styled.header`
  background-color: ${x => x.theme.primaryThemeColor};
  padding: 0 0 0 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  svg {
    padding: 1.5em 0;
    fill: ${x => x.theme.navigationIconColor};
    width: 113px;
    height: 42px;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    padding: 1.5em;
    display: flex;
    flex-direction: row;
    justify-items: space-between;

    svg {
      padding: 0;
    }
  }
`;

const StyledButton = styled(Button)`
  display: block;
  padding: 0 1.5em 0 1.5em;
  width: 100%;
  text-align: center;
  background-color: ${props => props.theme.primaryDarkThemeColor}
  box-sizing: border-box;

  button {
    background-color: transparent;
    width: 100%;

    &:hover,
    &:focus {
      background-color: transparent;
    }

    svg {
      padding: 0px;
      fill: ${x => x.theme.navigationIconColor};
      width: 42px;
      height: 42px;
    }
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    display: none;
  }
`;

const StyledUl = styled.ul`
  list-decoration: none;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  display: none;
  flex-direction: column;
  background-color: ${props => props.theme.primaryDarkThemeColor};
  width: 100%;
  padding: 0 1.5em;

  @media (min-width: ${props => props.theme.smToMd}) {
    display: flex !important;
    align-items: center;
    flex-direction: row;
    max-height: initial !important;
    background-color: transparent !important;
    width: auto;
  }

  li {
    display: inline-block;

    a {
      padding: 0.25em 0.5em;
      font-size: 24px;
      display: inline-block;
    }
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

export interface NavigationState {
  isOpen: boolean;
}

class Navigation extends React.PureComponent<{}, NavigationState> {
  public constructor(props: any) {
    super(props);

    this.state = { isOpen: false };
  }

  public render() {
    return (
      <Header>
        <Link to="/">
          <LogoSFYT />
        </Link>
        <StyledButton onClick={this.toggleMenu}>
          <Bar />
        </StyledButton>
        <StyledUl
          style={{
            maxHeight: this.state.isOpen ? "99999px" : "0",
            display: this.state.isOpen ? "flex" : "none"
          }}
        >
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/sauces">Sauces</StyledLink>
          </li>
          <li>
            <StyledLink to="/sauce/add">Add Sauce</StyledLink>
          </li>
          <li>
            <span>icon here</span>
          </li>
        </StyledUl>
      </Header>
    );
  }

  public toggleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const isOpen: boolean = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  };
}

export default Navigation;
