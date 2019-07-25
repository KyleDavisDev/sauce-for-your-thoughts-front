import * as React from "react";
import styled from "../../theme/styled-components";

interface ButtonProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | JSX.Element | Element>;
  displayType?: "outline" | "solid";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.SFC<ButtonProps> = props => {
  return (
    <div className={props.className} style={props.style}>
      <button
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
        aria-disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  displayType: "outline",
  type: "button",
  disabled: false
};

const StyledButton = styled(Button)`
  button {
    text-decoration: none;
    font-family: FuturaMedium;
    padding: 0.5em 1em;
    transition: all 0.2s ease;
    background-color: ${props =>
      props.displayType === "outline"
        ? "transparent"
        : props.theme.primaryThemeColor};
    border: ${props => "2px solid " + props.theme.primaryThemeColor};
    color: ${props =>
      props.displayType === "outline" ? props.theme.black : props.theme.white};

    &:disabled {
      color: ${props =>
        props.displayType === "outline"
          ? props.theme.black
          : props.theme.white};
      background-color: ${props =>
        props.displayType === "outline"
          ? props.theme.lightGrey
          : props.theme.primaryDarkThemeColor};
      border: ${props =>
        props.displayType === "outline"
          ? "2px solid " + props.theme.lightGrey
          : "2px solid " + props.theme.primaryDarkThemeColor};

      &:hover,
      &:focus {
        color: ${props =>
          props.displayType === "outline"
            ? props.theme.black
            : props.theme.white};
        background-color: ${props =>
          props.displayType === "outline"
            ? props.theme.lightGrey
            : props.theme.primaryDarkThemeColor};
        border: ${props =>
          props.displayType === "outline"
            ? "2px solid " + props.theme.lightGrey
            : "2px solid " + props.theme.primaryDarkThemeColor};
      }
    }

    &:hover,
    &:focus {
      cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
      background-color: ${props =>
        props.displayType === "outline"
          ? "transparent"
          : props.theme.secondaryThemeColor};
      border: ${props => "2px solid " + props.theme.secondaryThemeColor};
      color: ${props =>
        props.displayType === "outline"
          ? props.theme.secondaryThemeColor
          : props.theme.white};

      svg {
        fill: ${props =>
          props.displayType === "outline"
            ? props.theme.secondaryThemeColor
            : props.theme.white};
      }
    }
    svg {
      width: 20px;
      padding-left: 10px;
      transition: all 0.2s ease;
      fill: inherit;
    }
  }
`;

export { StyledButton as Button };
