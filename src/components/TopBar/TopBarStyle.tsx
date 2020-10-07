import styled from "../../theme/styled-components";

export const StyledDiv = styled.div`
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5em 0em;
`;
StyledDiv.displayName = "div";
