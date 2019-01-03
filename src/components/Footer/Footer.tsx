import * as React from "react";

import styled from "../../theme/styled-components";
import Navigation from "./components/Navigation/Navigation";
import Peppers from "./components/Peppers/Peppers";
import Types from "./components/Types/Types";
import About from "./components/About/About";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.primaryThemeColor};
`;

const StyledDiv = styled.div`
  max-width: ${props => props.theme.maxPageWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    width: 50%;
    box-sizing: border-box;
    padding: 0 1em;
  }

  > div:last-of-type {
    width: 100%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    flex-wrap: nowrap;

    > div,
    > div:last-of-type {
      width: 33%;
    }
  }
`;

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
