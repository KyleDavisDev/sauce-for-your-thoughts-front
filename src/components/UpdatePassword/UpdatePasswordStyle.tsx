import styled from "../../theme/styled-components";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;
