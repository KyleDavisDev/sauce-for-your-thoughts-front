import styled from "../../../../../../theme/styled-components";
import { Button } from "../../../../../Button/Button";

export const StyledContainer = styled.div`
  border: ${props => props.theme.border};
  font-family: AvenirNextReg;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 1em;
  max-height: 999px;
`;
StyledContainer.displayName = "div";

export const StyledButton = styled(Button)`
  background-color: ${props => props.theme.lightGrey};
  display: flex;
  align-items: stretch;
  font-size: 1.5em;

  > button {
    background-color: inherit;
    border-color: ${props => props.theme.lightGrey};
    transition: none;
    padding: 0.25em;
    margin: 0;
    width: 22px;

    &:hover {
      border-color: ${props => props.theme.secondaryThemeColor};
    }
    &:focus {
      border-color: ${props => props.theme.lightGrey};
    }

    &:hover,
    &:focus {
      background-color: inherit;
    }
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.secondaryThemeColor};
    cursor: pointer;
  }
`;
StyledButton.displayName = "Button";

export const StyledContentContainer = styled.div`
  padding: 1em;
`;
StyledContentContainer.displayName = "div";
