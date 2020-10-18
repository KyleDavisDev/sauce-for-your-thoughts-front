import styled from "../../../../../../theme/styled-components";

export const StyledDiv = styled.div`
  position: absolute;
  z-index: 1000;
  right: 0;
`;
StyledDiv.displayName = "div";

export const StyledUL = styled.ul`
  max-height: calc(100vh - 52px - 16px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 275px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.white};
  list-style: none;
  padding: 0;
  line-height: initial;
`;
StyledUL.displayName = "ul";
