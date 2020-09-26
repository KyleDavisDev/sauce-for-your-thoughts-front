import * as React from "react";

import styled from "../../theme/styled-components";

const StyledH1 = styled.h1`
  font-size: ${props => props.theme.scaleH1};
  font-family: FuturaMedium;
  margin: 2rem 0 1rem;
`;
StyledH1.displayName = "h1";

export interface PageTitleProps {
  children?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = props => {
  return <StyledH1 className={props.className}>{props.children}</StyledH1>;
};

export default PageTitle;
