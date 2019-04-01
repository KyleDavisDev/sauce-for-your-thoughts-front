import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
`;
StyledTextArea.displayName = "StyledTextArea";
