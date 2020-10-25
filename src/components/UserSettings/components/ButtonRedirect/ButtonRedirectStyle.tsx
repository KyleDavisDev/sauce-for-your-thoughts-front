import styled from "../../../../theme/styled-components";
import { Button } from "../../../Button/Button";

export const StyledButton = styled(Button)`
  display: inline-block;

  > button {
    color: #333;
  }
`;
StyledButton.displayName = "Button";

export const StyledDiv = styled.div`
  margin-bottom: 32px;
`;
StyledDiv.displayName = "div";
