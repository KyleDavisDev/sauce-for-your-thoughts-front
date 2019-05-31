import styled from "../../theme/styled-components";
import Article from "../../components/Article/Article";
import Card from "../../components/Card/Card";

export const StyledArticle = styled(Article)`
  max-width: 1200px;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledCardHolder = styled.div`
  padding-bottom: 2em;
  box-sizing: border-box;
`;

export const StyledCard = styled(Card)`
  margin: 0;
`;
