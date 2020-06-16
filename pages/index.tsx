import * as React from "react";
import styled from "../src/theme/styled-components";

import TopBar from "../src/components/TopBar/TopBar";
import Navigation from "../src/components/Navigation/Navigation";
import { Article } from "../src/components/Article/Article";
import Footer from "../src/components/Footer/Footer";
import LandingImage from "../src/components/LandingImage/LandingImage";
import NewestSauces from "../src/components/NewestSauces/NewestSauces";
import FeaturedSauces from "../src/components/FeaturedSauces/FeaturedSauces";

const StyledLandingImage = styled(LandingImage)`
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3.5rem;
  }
`;

const StyledArticle = styled(Article)`
  max-width: 1200px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

export interface IndexProps {
  history: { push: (location: string) => any };
}

class Index extends React.PureComponent<IndexProps, {}> {
  public render() {
    return (
      <>
        <TopBar />
        <Navigation />
        <StyledLandingImage />
        <StyledArticle>
          <NewestSauces />
          <FeaturedSauces />
          {/* <FeaturedUsers /> */}
        </StyledArticle>
        <Footer />
      </>
    );
  }
}

export default Index;
