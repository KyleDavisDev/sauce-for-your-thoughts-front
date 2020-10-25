import styled from "../../theme/styled-components";
import { Button } from "../Button/Button";

export const StyledContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
`;
StyledContainer.displayName = "div";

export const StyledText = styled.p`
  width: 80%;
  margin: 0 auto 1em;
  text-align: center;
`;
StyledText.displayName = "p";

export const StyledButton = styled(Button)`
  display: inline-block;

  > button {
    color: #333;
  }
`;
StyledButton.displayName = "button";

export const StyledGroup = styled.div`
  margin-bottom: 32px;
`;
StyledGroup.displayName = "div";
