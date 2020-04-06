import styled from "../../../../theme/styled-components";
import ReactCrop from "react-image-crop";

export const StyledOutline = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 2px dashed ${(props) => getColor(props)};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
  }
`;

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#ddd";
};

export const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
`;
