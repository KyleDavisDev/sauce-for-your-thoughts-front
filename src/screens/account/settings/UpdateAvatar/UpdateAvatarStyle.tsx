import styled from "styled-components";
import Article from "../../../../components/Article/Article";
import { RadioButton } from "../../../../components/RadioButton/RadioButton";

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
  border: ${props => props.theme.border};
  padding: 1.5rem;
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

export const StyledRadioButton = styled(RadioButton)`
  max-width: 50%;

  @media (min-width: ${props => props.theme.exToSm}) {
    max-width: 33%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    max-width: 25%;
  }
`;

export const StyledAvatarImg = styled.img`
  max-width: 100%;
`;
