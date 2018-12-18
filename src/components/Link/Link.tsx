import * as React from "react";
import { Link as DOMLink } from "react-router-dom";
import styled from "../../theme/styled-components";

interface LinkProps {
  children: string | Element | JSX.Element;
  to: string;
  className?: string;
}

const Link: React.SFC<LinkProps> = props => {
  return (
    <DOMLink to={props.to} className={props.className}>
      {props.children}
    </DOMLink>
  );
};

Link.defaultProps = {
  to: "#"
};

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: FuturaMedium;
  color: ${props => props.theme.secondaryThemeColor};

  &:hover,
  &:focus {
    color: ${props => props.theme.primaryThemeColor};
  }
`;

export { StyledLink as Link };
