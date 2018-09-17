import * as React from "react";

import styled from "../../theme/styled-components";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.primaryThemeColor};
  display: flex;
  flex-direction: row;
`;

const StyledDiv = styled.div`
  max-width: ${props => props.theme.maxPageWidth};
  margin: 0 auto;
`;

const StyledFooterNavigation = styled(FooterNavigation)`
  width: 25%;
  box-sizing: border-box;
  padding: 0 1em;
`;

interface FooterProps {}

const Footer: React.SFC<FooterProps> = props => {
  return (
    <StyledFooter>
      <StyledDiv>
        <FooterNavigation />
      </StyledDiv>
    </StyledFooter>
  );
};

export default Footer;
