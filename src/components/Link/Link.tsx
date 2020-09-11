import * as React from "react";
import Link from "next/link";
import styled from "../../theme/styled-components";

export interface LinkProps {
  children: string | JSX.Element | Array<string | JSX.Element>;
  href: string;
  className?: string;
  target?: "_blank" | "_self";
}

const LinkComponent: React.FC<LinkProps> = props => {
  return (
    <>
      {props.target === "_blank" ? (
        <a href={props.href} target="_blank" className={props.className}>
          {props.children}
        </a>
      ) : (
        <Link href={props.href}>
          <a className={props.className} target="_self">
            {props.children}
          </a>
        </Link>
      )}
    </>
  );
};

const StyledLink = styled(LinkComponent)`
  text-decoration: none;
  font-family: FuturaMedium;
  color: ${props => props.theme.primaryThemeColor};

  &:hover,
  &:focus {
    color: ${props => props.theme.secondaryThemeColor};
  }
`;

export { StyledLink as Link };
