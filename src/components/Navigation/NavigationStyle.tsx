import styled from "../../theme/styled-components";
import { Button } from "../Button/Button";
import { Link } from "../Link/Link";

export const Header = styled.header`
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

export const StyledButton = styled(Button)`
  display: block;
  padding: 0 1.5em 0 1.5em;
  width: 100%;
  text-align: center;
  background-color: ${props => props.theme.primaryDarkThemeColor};
  box-sizing: border-box;

  button {
    background-color: transparent;
    border: 0;
    width: 100%;

    &:hover,
    &:focus {
      background-color: transparent;
      border: 0;
      outline: 0;
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

export const StyledUl = styled.ul`
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

    li a {
      font-size: 18px !important;
    }
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

export const StyledLink = styled(Link)`
  color: ${x => x.theme.navigationTextColor};
  text-decoration: none;
  margin-right: 0.5em;
  font-family: AvenirNextReg;

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.black};
  }
`;
