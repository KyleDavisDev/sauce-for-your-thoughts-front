import styled from "styled-components";

export const StyledSauceContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

export const StyledImageContainer = styled.div`
  max-width: 100%;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 50%;
  }
`;

export const StyleImg = styled.img`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledSauceInfoContainer = styled.div`
  font-family: AvenirNextReg;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1em;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 50%;
  }
`;

export const StyledH2 = styled.h2`
  margin-bottom: 16px;
`;
