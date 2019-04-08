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
import { ISauce } from "../../../../redux/sauces/types";
import { getSauceBySlug } from "../../../../redux/sauces/actions";

export interface SauceSpotlightProps {
  location: { search: string };
  history: { push: (location: string) => any };
  sauce?: ISauce;
  getSauceBySlug: ({ data }: { data: { sauce: { slug: string } } }) => any;
  slug?: string;
}

class SauceSpotlight extends React.Component<SauceSpotlightProps, any> {
  constructor(props: SauceSpotlightProps) {
    super(props);
  }
  public componentDidMount() {
    console.log("whats up");
    // Get slug from URL
    const { slug }: { slug?: string } = this.props;

    // Sauce slug is whack, redirect user
    if (!slug) {
      this.props.history.push("/");
      // Maybe display banner too?
      return;
    }
    window.scrollTo(0, 0); // Move screen to top

    // construct data obj
    const data = { sauce: { slug } };

    // Go look for sauce data
    this.props.getSauceBySlug({ data }).catch((err: any) => console.log(err));
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

            {sauce && sauce.slug && <SauceReviews slug={sauce.slug} />}
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

const mapState2Props = (
  state: IinitialState,
  ownProps: SauceSpotlightProps
) => {
  // Check for undefined
  const bySlug = state.sauces.bySlug;
  if (!bySlug) return state;

  // Find our slug
  const values: OutputParams = queryString.parse(ownProps.location.search);
  // Make sure s is defined, not an array
  if (!values.s || Array.isArray(values.s)) {
    // Stop here since we will not have a slug
    ownProps.history.push("/");
    return;
  }
  // Assign slug
  const slug: string = values.s;

  // Find the specific sauce for our page
  const sauce = bySlug[slug];
  return { sauce, slug };
};

const mapDispatch2Props = {
  getSauceBySlug
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceSpotlight);
