import * as React from "react";
import styled from "styled-components";
import { Link } from "../Link/Link";

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
  slugText?: string;
  text?: string;
  children?: string;
}

const FlashMessage: React.SFC<FlashMessageProps> = props => {
  return (
    <StyledContainer className={props.className}>
      {props.isVisible && (
        <div>
          {props.children || props.text}{" "}
          {props.slug && props.slugText ? (
            <Link to={props.slug}>{props.slugText}</Link>
          ) : (
            ""
          )}{" "}
        </div>
      )}
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
    a {
      color: ${props =>
        props.type === "success"
          ? "#3c763d"
          : props.type === "warning"
          ? "#8a6d3b"
          : "#a94442"};
      font-weight: 700;
      transition: all 0.2s ease;

      &:hover,
      &:focus {
        color: #333;
      }
    }
  }
`;

export { StyledFlashMessage as FlashMessage };
