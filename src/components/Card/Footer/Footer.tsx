import * as React from "react";

import { Button } from "../../Button/Button";
import { StyledLink } from "./FooterStyle";

export interface IFooterProps {
  to: string;
  anchorText?: string;
}

const Footer: React.FunctionComponent<IFooterProps> = props => {
  const _defaultText = "View";

  const { to, anchorText = _defaultText } = props;

  return (
    <StyledLink href={to}>
      <Button displayType="outline">{anchorText}</Button>
    </StyledLink>
  );
};

export default Footer;
