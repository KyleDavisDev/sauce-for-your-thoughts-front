import * as React from "react";

import Navigation from "./components/Navigation/Navigation";
import TypesOfSauces from "./components/TypesOfSauces/TypesOfSauces";
import About from "./components/About/About";
import { StyledFooter, StyledDiv } from "./FooterStyle";

interface FooterProps {}

const Footer: React.FC<FooterProps> = props => {
  return (
    <StyledFooter>
      <StyledDiv>
        <Navigation />
        <TypesOfSauces />
        <About />
      </StyledDiv>
    </StyledFooter>
  );
};

export default Footer;
