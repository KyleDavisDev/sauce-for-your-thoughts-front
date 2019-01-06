import styled from "../../theme/styled-components";
import Star from "../../images/icons/Star";
import Descriptor from "../../components/Descriptor/Descriptor";
import { Button } from "../../components/Button/Button";

export const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: top;
  padding-bottom: 4rem;
  flex-wrap: wrap;

  @media (min-width: ${props => props.theme.smToMd}) {
    flex-wrap: nowrap;
  }
`;

export const StyledDescriptor = styled(Descriptor)`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;

  @media (min-width: ${props => props.theme.smToMd}) {
    max-width: 33%;
  }
`;

export const StyledRightSide = styled.div`
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  display: block;

  @media (min-width: ${props => props.theme.smToMd}) {
    max-width: 66%;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
    color: #333;
    &:hover,
    &:focus {
      svg {
        fill: #fff;
      }
    }
  }

  svg {
    width: 20px;
    padding-left: 10px;
    fill: #333;
    transition: all 0.2s ease;
  }
`;

export const StyledEmptyStar = styled(Star)`
  .border {
    fill: ${props => props.theme.primaryThemeColor};
  }

  .center {
    fill: transparent;
  }
`;
export const StyledFullStar = styled(Star)`
  .border,
  .center {
    fill: ${props => props.theme.primaryThemeColor};
  }
`;
