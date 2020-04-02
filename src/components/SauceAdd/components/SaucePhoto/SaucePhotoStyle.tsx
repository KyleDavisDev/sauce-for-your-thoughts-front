import styled from "../../../../theme/styled-components";

export const StyledOutline = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 2px dashed #ddd;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
  }
`;
