import Descriptor from "../Descriptor/Descriptor";
import { TextInput } from "../TextInput/TextInput";
import TextArea from "../TextArea/TextArea";
import styled from "../../theme/styled-components";
import { Button } from "../Button/Button";

export const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
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

export const StyledTextInput = styled(TextInput)`
  width: 100%;
  float: left;
  max-width: 50%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

export const StyledTextArea = styled(TextArea)`
  float: left;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

export const StyledDiv = styled.div`
  max-width: 50%;
  float: left;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;

  > label {
    padding: 0rem;
  }

  > div {
    // margin: 0.25rem 1rem 0.25rem;
  }
`;

export const StyledDiv2 = styled.div`
  padding: 0 1rem;
`;

export const StyledDropdownContainer = styled.div`
  border: 1px solid #e1e1e1;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  width: 100%;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }

  select {
    width: 100%;
    background-color: #f3f3f3;
    appearance: none;
    border: 0;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    vertical-align: middle;
    height: 38px;
    padding: 0px 40px 0 15px;
    font-size: 1rem;
  }
`;

export const StyledPhotoContainer = styled.div`
  max-width: 66%;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
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

export const StyledImageButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 0;
  > div {
    padding-right: 10px;
  }
`;
