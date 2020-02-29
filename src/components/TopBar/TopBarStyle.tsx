import styled from "styled-components";
import { Link } from "../Link/Link";
import { Dropdown, Trigger, Body } from "./components/Dropdown/Dropdown";

export const StyledDiv = styled.div`
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5em 0em;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 2em;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;

export const StyledDropDown = styled(Dropdown)`
  margin-right: 2em;
`;

export const StyledAvatar = styled.img`
  max-width: 35px;
  margin-left: 5px;
`;
