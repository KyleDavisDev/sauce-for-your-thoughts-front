import * as React from "react";

import Navigation from "./components/Navigation/Navigation";
import Types from "./components/Types/Types";
import About from "./components/About/About";
import { StyledFooter, StyledDiv } from "./FooterStyle";

interface FooterProps {}

const Footer: React.SFC<FooterProps> = props => {
  return (
    <StyledFooter>
      <StyledDiv>
        <Navigation />
        <Types />
        <About />
      </StyledDiv>
    </StyledFooter>
  );
};

export default Footer;
