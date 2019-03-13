import * as React from "react";
import { connect } from "react-redux";
import queryString, { OutputParams } from "query-string";

import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Navigation from "../../../../components/Navigation/Navigation";
import Footer from "../../../../components/Footer/Footer";
import SauceHero from "./components/SauceHero/SauceHero";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import SauceAuthor from "./components/SauceAuthor/SauceAuthor";
import {
  StyledArticle,
  StyledLeftContainer,
  StyledRightContainer,
  StyledDescriptor,
  StyledH2
} from "./SauceSpotlightStyle";
import { dummyData } from "./dummyData";
import { ISauce } from "../../../../redux/sauce/types";
import { getSauceBySlug } from "../../../../redux/sauces/actions";

export interface SauceSingleProps {
  location: { search: string };
  history: { push: (location: string) => any };
  sauce?: ISauce;
}

class SauceSingle extends React.Component<SauceSingleProps, any> {
  constructor(props: SauceSingleProps) {
    super(props);
  }
  public componentDidMount() {
    // Get slug from URL
    const slug: string | null = this.getPageFromPath(
      this.props.location.search // this value is what react-router assings to '?s=....'
    );

    // Sauce slug is whack, redirect user
    if (slug === null) {
      this.props.history.push("/");
      // Maybe display banner too?
    }
    window.scrollTo(0, 0); // Move screen to top

    // Go look for sauce data
    this.props.getSauceBySlug;
  }

  public render() {
    const { sauce } = this.props;

    return (
      <div>
        <TopBar />
        <Navigation />

        <StyledArticle>
          <StyledLeftContainer>
            <PageTitle>{sauce ? sauce.name : "Loading..."}</PageTitle>
            {/* Spotlight */}
            {sauce ? <SauceHero sauce={sauce} /> : "Loading..."}

            {/* Reviews */}
            <StyledDescriptor title="Reviews">
              The opinions expressed are soley those of the author.
            </StyledDescriptor>

            {sauce && sauce.slug && (
              <SauceReviews slug={sauce.slug} reviews={sauce.reviews} />
            )}
          </StyledLeftContainer>

          <StyledRightContainer>
            <StyledH2>Author</StyledH2>
            {sauce && sauce.author ? <SauceAuthor id={"5"} /> : "Loading..."}
          </StyledRightContainer>
        </StyledArticle>
        <Footer />
      </div>
    );
  }

  private getPageFromPath(path: string): string | null {
    // Get s from string
    const values: OutputParams = queryString.parse(path);

    // Make sure s is defined, not an array
    if (!values.s || Array.isArray(values.s)) {
      return null;
    }

    return values.s;
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

const mapDispatch2Props = {
  getSauceBySlug
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceSingle);
