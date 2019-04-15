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
import { IReview } from "../../../../redux/reviews/types";

export interface SauceSpotlightProps {
  location: { search: string };
  history: { push: (location: string) => any };
  sauce?: ISauce;
  reviews?: IReview[];
  getSauceBySlug: ({ data }: { data: { sauce: { slug: string } } }) => any;
  slug?: string;
}

class SauceSpotlight extends React.Component<SauceSpotlightProps, any> {
  constructor(props: SauceSpotlightProps) {
    super(props);
  }
  public componentDidMount() {
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
    const { sauce, reviews } = this.props;

    return (
      <div>
        <TopBar />
        <Navigation />

        <StyledArticle>
          <StyledLeftContainer>
            <PageTitle>{sauce ? sauce.name : "Loading..."}</PageTitle>
            {/* Spotlight */}
            <SauceHero sauce={sauce} />

            {/* Reviews */}
            <StyledDescriptor title="Reviews">
              The opinions expressed are soley those of the author.
            </StyledDescriptor>

            <SauceReviews
              slug={sauce && sauce.slug ? sauce.slug : undefined}
              reviews={reviews}
            />
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
}

const mapState2Props = (
  state: IinitialState,
  ownProps: SauceSpotlightProps
) => {
  // Find our slug -- If we can't find one, we are immediately done
  const values: OutputParams = queryString.parse(ownProps.location.search);
  // Make sure s is defined, not an array
  if (!values.s || Array.isArray(values.s)) {
    // Stop here since we will not have a slug
    ownProps.history.push("/");
    return;
  }
  // Assign slug
  const slug: string = values.s;

  // Check for undefined
  const bySlug = state.sauces.bySlug;
  if (!bySlug) return { slug };

  // Find the specific sauce for our page
  const sauce = bySlug[slug];
  if (!sauce) return { slug }; // or stop here if we cant

  // If we have reviews, get those too. Else return what we have
  const byHashID = state.reviews.byHashID || {};
  const revs = sauce.reviews || [];
  if (revs && revs.length > 0 && byHashID && Object.keys(byHashID).length > 0) {
    // Push all reviews in reviews array
    const reviews: IReview[] = revs.map(hashID => {
      // push specific review into array
      return byHashID[hashID];
    });

    // Return w/ the found reviews
    return { sauce, slug, reviews };
  }

  // return sauce and slug only
  return { sauce, slug };
};

const mapDispatch2Props = {
  getSauceBySlug
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceSpotlight);
