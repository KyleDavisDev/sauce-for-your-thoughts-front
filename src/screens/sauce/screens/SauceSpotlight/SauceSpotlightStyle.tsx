import Article from "../../../../components/Article/Article";
import styled from "../../../../theme/styled-components";
import Descriptor from "../../../../components/Descriptor/Descriptor";
import PageTitle from "../../../../components/PageTitle/PageTitle";

export const StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
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

export const StyledH2 = styled.h2`
  margin-top: 16px;
  margin-bottom: 16px;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-top: 51px;
  }
`;

export const StyledPageTitle = styled(PageTitle)`
  width: 100%;
`;
