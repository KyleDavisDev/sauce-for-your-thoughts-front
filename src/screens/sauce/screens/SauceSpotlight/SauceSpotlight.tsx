import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";

import Article from "../../../../components/Article/Article";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Navigation from "../../../../components/Navigation/Navigation";
import styled from "../../../../theme/styled-components";
import Footer from "../../../../components/Footer/Footer";
import SpotlightHero from "./components/SauceContainer/SpotlightHero";
import Descriptor from "../../../../components/Descriptor/Descriptor";

const StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledLeftContainer = styled.div`
  width: 66%;
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
  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <StyledLeftContainer>
            <PageTitle>Chalulu hot sauce</PageTitle>
            <SpotlightHero id={"5"} />

            <StyledDescriptor title="Reviews">
              The opinions expressed are soley those of the author.
            </StyledDescriptor>
          </StyledLeftContainer>
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
