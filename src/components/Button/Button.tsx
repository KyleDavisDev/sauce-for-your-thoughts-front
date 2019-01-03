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
}

const Button: React.SFC<ButtonProps> = props => {
  return (
    <div className={props.className} style={props.style}>
      <button onClick={props.onClick} type={props.type}>
        {props.children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  displayType: "outline",
  type: "button"
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
    border: ${props =>
      props.displayType === "outline"
        ? "2px solid " + props.theme.primaryThemeColor
        : "none"};
    color: ${props =>
      props.displayType === "outline"
        ? props.theme.primaryThemeColor
        : props.theme.white};

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: ${props =>
        props.displayType === "outline"
          ? "transparent"
          : props.theme.secondaryThemeColor};
      border: ${props =>
        props.displayType === "outline"
          ? "2px solid " + props.theme.secondaryThemeColor
          : "none"};
      color: ${props =>
        props.displayType === "outline"
          ? props.theme.secondaryThemeColor
          : props.theme.white};
    }
  }
`;

export { StyledButton as Button };
