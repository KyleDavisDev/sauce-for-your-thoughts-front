import styled from "../../theme/styled-components";
import { Article } from "../Article/Article";
import { RadioButton } from "../RadioButton/RadioButton";

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
