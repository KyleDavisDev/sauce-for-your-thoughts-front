import styled from "styled-components";

export const StyledSauceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;
StyledSauceContainer.displayName = "div";

export const ImageContainer = styled.div`
  max-width: 100%;
  padding: 0 5px;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 50%;
    padding: 0 15px;
  }
`;
ImageContainer.displayName = "div";

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
StyledSauceInfoContainer.displayName = "div";

export const StyledH2 = styled.h2`
  margin-bottom: 16px;
`;
StyledH2.displayName = "h2";
