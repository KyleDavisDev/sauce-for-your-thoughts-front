import styled from "../../theme/styled-components";
import { Article } from "../Article/Article";
import Card from "../Card/Card";

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
  width: 50%;

  @media (min-width: ${props => props.theme.exToSm}) {
    width: 33%;
  }
  @media (min-width: ${props => props.theme.smToMd}) {
    width: 25%;
  }
  @media (min-width: ${props => props.theme.mdToLg}) {
    width: 20%;
  }
`;

export const StyledCard = styled(Card)`
  margin: 0;
`;
