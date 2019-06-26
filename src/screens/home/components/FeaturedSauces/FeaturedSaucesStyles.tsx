import styled from "styled-components";
import Card from "../../../../components/Card/Card";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1em;
`;

export const StyledCard = styled(Card)`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
`;

export const StyledCardHolder = styled.div`
  padding: 1em;
  box-sizing: border-box;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
`;
