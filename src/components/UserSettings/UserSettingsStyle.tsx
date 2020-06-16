import styled from "../../theme/styled-components";
import Article from "../Article/Article";
import { Button } from "../Button/Button";

export const StyledDiv = styled.div`
  height: 100vh;
`;

export const StyledArticle = styled(Article)`
  max-width: 600px;
`;
export const StyledContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
`;

export const StyledText = styled.p`
  width: 80%;
  margin: 0 auto 1em;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  display: inline-block;

  > button {
    color: #333;
  }
`;

export const StyledGroup = styled.div`
  margin-bottom: 32px;
`;
