import * as React from "react";
import { Link as DOMLink } from "react-router-dom";
import styled from "../../theme/styled-components";

interface LinkProps {
  children?: string;
  type?: "outline" | "solid";
  linkTo?: string;
  className?: string;
}

const Div = styled.div`
  display: flex;
  align-items: stretch;
`;

const Link: React.SFC<LinkProps> = props => {
  return (
    <Div className={props.className}>
      <DOMLink to={props.linkTo || "#"} className={props.className}>
        {props.children}
      </DOMLink>
    </Div>
  );
};

Link.defaultProps = {
  type: "outline",
  linkTo: "#"
};

const StyledLink = styled(Link)`
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

export default StyledLink;
