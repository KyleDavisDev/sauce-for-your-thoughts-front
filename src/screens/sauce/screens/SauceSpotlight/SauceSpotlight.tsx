import * as React from "react";
import { connect } from "react-redux";

import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";
import Article from "../../../../components/Article/Article";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Navigation from "../../../../components/Navigation/Navigation";
import styled from "../../../../theme/styled-components";
import Footer from "../../../../components/Footer/Footer";
import Descriptor from "../../../../components/Descriptor/Descriptor";
import SauceSpotlight from "./components/SauceSpotlight/SauceSpotlight";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import SauceAuthor from "./components/SauceAuthor/SauceAuthor";

const StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledTitleContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0 auto;
`;

const StyledLeftContainer = styled.div`
  width: 66%;
  box-sizing: border-box;
  padding: 0 1em;
`;

const StyledRightContainer = styled.div`
  width: 33%;
  box-sizing: border-box;
  padding: 0 1em;
`;

const StyledDescriptor = styled(Descriptor)`
  > p {
    margin-top: 0;
    font-style: italic;
  }
`;

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

        {/* Titles */}
        <StyledTitleContainer>
          <StyledLeftContainer>
            <PageTitle>Chalulu hot sauce</PageTitle>
          </StyledLeftContainer>

          <StyledRightContainer>
            <StyledDescriptor title="Author" />
          </StyledRightContainer>
        </StyledTitleContainer>

        {/* Actual page content */}
        <StyledArticle>
          <StyledLeftContainer>
            {/* Spotlight */}
            <SauceSpotlight id={"5"} />

            {/* Reviews */}
            <StyledDescriptor title="Reviews">
              The opinions expressed are soley those of the author.
            </StyledDescriptor>
            <SauceReviews id={"5"} />
          </StyledLeftContainer>
          <StyledRightContainer>
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
