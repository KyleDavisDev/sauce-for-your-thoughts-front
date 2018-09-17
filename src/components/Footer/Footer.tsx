import * as React from "react";

import styled from "../../theme/styled-components";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation";

const StyledDiv = styled.div`
  width: 100%;
  background-color: ${props => props.theme.primaryThemeColor};
  display: flex;
  flex-direction: row;
`;

interface FooterProps {}

const Footer: React.SFC<FooterProps> = props => {
  return (
    <StyledDiv>
      <FooterNavigation />
    </StyledDiv>
  );
};

export default Footer;
