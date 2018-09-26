import * as React from "react";
import { Link } from "react-router-dom";
import styled from "../../theme/styled-components";

interface ButtonProps {
  children?: string;
  type?: "outline" | "solid";
  linkTo?: string;
  className?: string;
}

const Div = styled.div`
  display: flex;
  align-items: stretch;
`;

const Button: React.SFC<ButtonProps> = props => {
  return (
    <Div className={props.className}>
      <Link to={props.linkTo || "#"} className={props.className}>
        {props.children}
      </Link>
    </Div>
  );
};

Button.defaultProps = {
  type: "outline",
  linkTo: "#"
};

const StyledButton = styled(Button)`
  a {
    text-decoration: none;
    padding: 0.5em 1em;
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
  }
`;

export default StyledButton;
