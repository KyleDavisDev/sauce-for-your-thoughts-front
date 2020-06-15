import styled from "../../theme/styled-components";
import Article from "../Article/Article";

export const StyledDiv = styled.div`
  height: 100vh;
`;

export const StyledLogoContainer = styled.div`
  max-width: 150px;
  margin: 0 auto;
  padding: 1em;
`;

export const StyledArticle = styled(Article)`
  max-width: 600px;
`;
export const StyledFormContainer = styled.div`
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
