import styled from "../../theme/styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  p {
    font-size: 0.85rem;
    margin-top: 1px;
    margin-bottom: 15px;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ababab;
  margin-top: 5px;
  margin-bottom: 15px;
  min-width: 100%;
  min-height: 35px;
  max-height: 220px;
  font-family: System;
`;
StyledTextArea.displayName = "StyledTextArea";
