import styled from "styled-components";
import Select from "../../Select/Select";
import { TextInput } from "../../TextInput/TextInput";
import { Button } from "../../Button/Button";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5em !important;
`;

export const StyledForm = styled.form`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.exToSm}) {
    flex-direction: row;
    align-items: flex-end;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    align-items: flex-end;
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  select {
    height: 35px;
  }

  @media (min-width: ${props => props.theme.exToSm}) {
    width: 50%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 20%;
  }
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  input {
    margin-bottom: 0px;
    height: 35px;
  }

  @media (min-width: ${props => props.theme.exToSm}) {
    width: 50%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 20%;
  }
`;

export const StyledButton = styled(Button)`
  padding: 10px;
  box-sizing: border-box;

  button {
    width: 100%;
  }

  @media (min-width: ${props => props.theme.exToSm}) {
    width: 100%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    width: 10%;
  }
`;
