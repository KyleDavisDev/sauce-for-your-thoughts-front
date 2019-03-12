import * as React from "react";
import { connect } from "react-redux";

import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Navigation from "../../../../components/Navigation/Navigation";
import Footer from "../../../../components/Footer/Footer";
import SauceSpotlight from "./components/SauceSpotlight/SauceSpotlight";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import SauceAuthor from "./components/SauceAuthor/SauceAuthor";
import {
  StyledArticle,
  StyledLeftContainer,
  StyledRightContainer,
  StyledDescriptor,
  StyledH2
} from "./SauceSpotlightStyle";

export interface SauceSingleProps {}

class SauceSingle extends React.Component<SauceSingleProps, any> {
  public componentDidMount() {
    window.scrollTo(0, 0); // Move screen to top
  }
  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />

        <StyledArticle>
          <StyledLeftContainer>
            <PageTitle>Chalulu hot sauce</PageTitle>
            {/* Spotlight */}
            <SauceSpotlight id={"5"} />

            {/* Reviews */}
            <StyledDescriptor title="Reviews">
              The opinions expressed are soley those of the author.
            </StyledDescriptor>
            <SauceReviews id={"5"} />
          </StyledLeftContainer>
          <StyledRightContainer>
            <StyledH2>Author</StyledH2>
            <SauceAuthor id={"5"} />
          </StyledRightContainer>
        </StyledArticle>
        <Footer />
      </div>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceSingle);
