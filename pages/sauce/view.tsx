import * as React from "react";

import SauceSpotlight from "../../src/components/SauceSpotlight/SauceSpotlight";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import { Article } from "../../src/components/Article/Article";
import Footer from "../../src/components/Footer/Footer";
import styled from "../../src/theme/styled-components";

interface ISauceViewPageProps {}

const SauceViewPage: React.SFC<ISauceViewPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <StyledArticle size="lg">
        <SauceSpotlight />
      </StyledArticle>
      <Footer />
    </>
  );
};

export default SauceViewPage;

let StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 1em;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-top: 2em;
  }

  > div {
    padding: 1em;
  }
`;
