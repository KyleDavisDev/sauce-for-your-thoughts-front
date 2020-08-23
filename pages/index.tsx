import * as React from "react";

import TopBar from "../src/components/TopBar/TopBar";
import Navigation from "../src/components/Navigation/Navigation";
import { Article } from "../src/components/Article/Article";
import Footer from "../src/components/Footer/Footer";
import LandingImage from "../src/components/LandingImage/LandingImage";
import NewestSauces from "../src/components/NewestSauces/NewestSauces";
import FeaturedSauces from "../src/components/FeaturedSauces/FeaturedSauces";

export interface IndexProps {
  history: { push: (location: string) => any };
}

class Index extends React.PureComponent<IndexProps, {}> {
  public render() {
    return (
      <>
        <TopBar />
        <Navigation />
        <LandingImage />
        <Article size="lg">
          <NewestSauces />
          <FeaturedSauces />
          {/* <FeaturedUsers /> */}
        </Article>
        <Footer />
      </>
    );
  }
}

export default Index;
