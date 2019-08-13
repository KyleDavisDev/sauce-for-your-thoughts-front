import * as React from "react";
import styled from "../../theme/styled-components";

import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Article from "../../components/Article/Article";
import Footer from "../../components/Footer/Footer";
import LandingImage from "./components/LandingImage/LandingImage";
import NewestSauces from "./components/NewestSauces/NewestSauces";
import FeaturedSauces from "./components/FeaturedSauces/FeaturedSauces";
import FeaturedUsers from "./components/FeaturedUsers/FeaturedUsers";

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

export interface HomeProps {
  history: { push: (location: string) => any };
}

class Home extends React.PureComponent<HomeProps, {}> {
  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledLandingImage history={this.props.history} />
        <StyledArticle>
          <NewestSauces />
          <FeaturedSauces />
          <FeaturedUsers />
        </StyledArticle>
        <Footer />
      </div>
    );
  }
}

export default Home;
