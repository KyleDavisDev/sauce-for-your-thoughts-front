import styled from "../../theme/styled-components";
import { Article } from "../Article/Article";

export const StyledArticle = styled(Article)`
  max-width: 600px;
`;
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
