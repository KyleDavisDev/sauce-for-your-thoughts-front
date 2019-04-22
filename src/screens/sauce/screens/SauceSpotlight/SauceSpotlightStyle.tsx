import Article from "../../../../components/Article/Article";
import styled from "../../../../theme/styled-components";
import Descriptor from "../../../../components/Descriptor/Descriptor";

export const StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 1em;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-top: 2em;
  }
`;

export const StyledLeftContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1em;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 80%;
  }
`;

export const StyledRightContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1em;

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 20%;
  }
`;

export const StyledDescriptor = styled(Descriptor)`
  > p {
    margin-top: 0;
    font-style: italic;
  }
`;
