import * as React from "react";

import styled from "../../theme/styled-components";

const StyledH1 = styled.h1`
  font-size: ${props => props.theme.scaleH1};
  margin-bottom: 0.5rem;
`;
StyledH1.displayName = "StyledH1";

interface PageTitleProps {
  children?: string;
  className?: string;
}

const PageTitle: React.SFC<PageTitleProps> = props => {
  return <StyledH1 className={props.className}>{props.children}</StyledH1>;
};

export default PageTitle;
