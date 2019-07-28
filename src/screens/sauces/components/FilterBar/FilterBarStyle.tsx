import styled from "styled-components";
import DropDown from "../../../../components/DropDown/DropDown";

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
  width: 25%;

  select {
    height: 35px;
  }
`;
