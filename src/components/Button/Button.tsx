import * as React from "react";
import styled from "../../theme/styled-components";

interface ButtonProps {
  text: string;
  type?: string;
  isLink?: boolean;
  linkTo?: string;
  className?: string;
  onClick(event: any): void;
}

const Div = styled.div`
  display: flex;
  align-items: stretch;
`;

const Button: React.SFC<ButtonProps> = props => {
  return (
    <Div>
      {props.isLink ? (
        <a href={props.linkTo} className={props.className}>
          {props.text}
        </a>
      ) : (
        <button>{props.text}</button>
      )}
    </Div>
  );
};

Button.defaultProps = {
  type: "outline",
  isLink: true,
  linkTo: "#"
};

const StyledButton = styled(Button)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0em 1em;
  transition: all 0.2s ease;
  background-color: ${props =>
    props.type === "outline" ? "transparent" : props.theme.primaryThemeColor};
  border: ${props =>
    props.type === "outline"
      ? "2px solid " + props.theme.primaryThemeColor
      : "none"};
  color: ${props =>
    props.type === "outline"
      ? props.theme.primaryThemeColor
      : props.theme.white};

  &:hover,
  &:focus {
    background-color: ${props =>
      props.type === "outline"
        ? "transparent"
        : props.theme.secondaryThemeColor};
    border: ${props =>
      props.type === "outline"
        ? "2px solid " + props.theme.secondaryThemeColor
        : "none"};
    color: ${props =>
      props.type === "outline"
        ? props.theme.secondaryThemeColor
        : props.theme.white};
  }
`;

export default StyledButton;
