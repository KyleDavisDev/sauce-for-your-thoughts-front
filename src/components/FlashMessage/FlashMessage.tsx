import * as React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  margin-bottom: 15px;
`;

export interface FlashMessageProps {
  className?: string;
  type?: "success" | "warning" | "alert";
  isVisible: boolean;
  slug?: string;
  text?: string;
  children?: string;
}

const FlashMessage: React.SFC<FlashMessageProps> = props => {
  return (
    <StyledContainer className={props.className}>
      {props.isVisible && <div>{props.children || props.text}</div>}
    </StyledContainer>
  );
};

FlashMessage.defaultProps = {
  isVisible: true
};

const StyledFlashMessage = styled(FlashMessage)`
  div {
    padding: 10px 15px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${props =>
      props.type === "success"
        ? "#dff0d8"
        : props.type === "warning"
        ? "#fcf8e3"
        : "#f2dede"};
    border-left: 7px solid
      ${props =>
        props.type === "success"
          ? "#d0e9c6"
          : props.type === "warning"
          ? "#faf2cc"
          : "#ebcccc"};
    color: ${props =>
      props.type === "success"
        ? "#3c763d"
        : props.type === "warning"
        ? "#8a6d3b"
        : "#a94442"};
  }
`;

export { StyledFlashMessage as FlashMessage };
