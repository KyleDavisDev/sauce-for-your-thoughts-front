import styled from "../../../theme/styled-components";
import { Button } from "../../Button/Button";
import Select from "../../Select/Select";
import { TextInput } from "../../TextInput/TextInput";

export const StyledContainer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
StyledContainer.displayName = "div";

export const StyledTitle = styled.h1`
  color: ${x => x.theme.landingHeroTextColor};
  font-family: FuturaMedium;
`;
StyledTitle.displayName = "h1";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
StyledDiv.displayName = "div";

export const StyledSelect = styled(Select)`
  min-height: 30px;
  border: 0px;
  box-sizing: border-box;

  > div {
    width: auto;

    &:after {
      top: 3px;
    }
  }

  select {
    width: auto;
    border: 0;
  }
`;
StyledSelect.displayName = "Select";

export const StyledInput = styled(TextInput)`
  flex-direction: row;
  align-items: stretch;

  input {
    border: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: 100%;
    min-width: auto;
    max-width: 100%;
    padding: 0.66em;
    box-sizing: border-box;
    border: 0px;
    font-size: 1em;

    @media (min-width: ${props => props.theme.smToMd}) {
      min-width: 20em;
    }
  }
`;
StyledInput.displayName = "TextInput";

export const StyledButton = styled(Button)`
  display: flex;
`;
StyledButton.displayName = "Button";
