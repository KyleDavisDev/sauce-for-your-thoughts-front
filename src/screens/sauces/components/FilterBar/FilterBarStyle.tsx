import styled from "styled-components";
import DropDown from "../../../../components/DropDown/DropDown";
import { TextInput } from "../../../../components/TextInput/TextInput";

export const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5em !important;
`;

export const StyledFrom = styled.form`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledDropDown = styled(DropDown)`
  width: 20%;

  select {
    height: 35px;
  }
`;

export const StyledInput = styled(TextInput)`
  width: 20%;
  input {
    margin-bottom: 0px;
    height: 35px;
  }
`;
