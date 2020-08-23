import styled from "styled-components";

export const StyledSauceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

export const StyledImageContainer = styled.div`
  max-width: 100%;
  padding: 0 5px;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 50%;
    padding: 0 15px;
  }
`;

export const StyleImg = styled.img`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledSauceInfoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 5px;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 50%;
    padding: 0 15px;
  }
`;

export const StyledH2 = styled.h2`
  margin-bottom: 16px;
`;
