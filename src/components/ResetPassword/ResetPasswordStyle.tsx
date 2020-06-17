import styled from "styled-components";

import { Button } from "../../components/Button/Button";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledText = styled.p`
  margin: 0 auto 1em;
`;

export const StyledButton = styled(Button)`
  text-align: center;
`;
