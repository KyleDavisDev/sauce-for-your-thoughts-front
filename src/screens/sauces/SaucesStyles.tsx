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
  justify-content: space-around;
`;

export const StyledCardHolder = styled.div`
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex: 1 auto auto;
`;

export const StyledCard = styled(Card)`
  margin: 0;
`;
