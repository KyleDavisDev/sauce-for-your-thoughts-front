import * as React from "react";
import { connect } from "react-redux";
import queryString, { OutputParams } from "query-string";

import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";
import Navigation from "../../../../components/Navigation/Navigation";
import Footer from "../../../../components/Footer/Footer";
import SauceHero from "./components/SauceHero/SauceHero";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import {
  StyledArticle,
  StyledLeftContainer,
  StyledRightContainer,
  StyledDescriptor
} from "./SauceSpotlightStyle";
import { ISauce } from "../../../../redux/sauces/types";
import { getSauceBySlug } from "../../../../redux/sauces/actions";
import { IReview } from "../../../../redux/reviews/types";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";
import List from "../../../../components/List/List";

export interface SauceSpotlightProps {
  location: { search: string };
  history: { push: (location: string) => any };
  sauce?: ISauce;
  reviews?: IReview[];
  getSauceBySlug: ({ slug }: { slug: string }) => Promise<null>;
  slug?: string;
  saucesWithNewestReviews?: Array<{ name: string; slug: string }>;
  displayEditLink?: boolean;
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

    // If we don't have sauce, go look for it
    if (!this.props.sauce) {
      this.props.getSauceBySlug({ slug }).catch((err: any) => console.log(err));
    }
  }

  public componentDidUpdate(prevProps: SauceSpotlightProps) {
    // If page has changed
    if (prevProps.location.search !== this.props.location.search) {
      // Get slug from URL
      const { slug }: { slug?: string } = this.props;

      // Sauce slug is whack, redirect user
      if (!slug) {
        this.props.history.push("/");
        // Maybe display banner too?
        return;
      }

      this.props.getSauceBySlug({ slug }).catch((err: any) => console.log(err));
    }
  }

  public shouldComponentUpdate(nextProps: SauceSpotlightProps) {
    // If sauce not passed to component, we should update
    if (!this.props.sauce) return true;

    // If page has changed
    if (nextProps.location.search !== this.props.location.search) return true;

    return false;
  }

  public render() {
    const {
      sauce,
      reviews,
      saucesWithNewestReviews,
      displayEditLink
    } = this.props;

    return (
      <div>
        <TopBar />
        <Navigation />

        <StyledArticle>
          <StyledLeftContainer>
            {/* Spotlight */}
            <SauceHero sauce={sauce} />

            {/* Reviews */}
            <StyledDescriptor
              title={`Reviews (${reviews ? reviews.length : 0})`}
            >
              The opinions expressed are soley those of the author.
            </StyledDescriptor>

            <SauceReviews
              slug={sauce && sauce.slug ? sauce.slug : undefined}
              reviews={reviews}
              displayEditLink={displayEditLink}
            />
          </StyledLeftContainer>

          <StyledRightContainer>
            {this.showAppropriateReviewButton()}
            {sauce && sauce._related && sauce._related.length > 0 && (
              <List
                items={sauce._related.map(x => {
                  return { link: `/sauce?s=${x.slug}`, text: x.name };
                })}
                title="Related Sauces"
              />
            )}
            {saucesWithNewestReviews && saucesWithNewestReviews.length > 0 && (
              <List
                items={saucesWithNewestReviews.map(x => {
                  return { link: `/sauce?s=${x.slug}`, text: x.name };
                })}
                title="Newly Added Reviews"
              />
            )}
          </StyledRightContainer>
        </StyledArticle>
        <Footer />
      </div>
    );
  }

  // Return appropriate "Edit" or "Add" review button. Or loading text.
  public showAppropriateReviewButton(): JSX.Element {
    const { sauce, displayEditLink } = this.props;
    // Make sure we have sauce
    if (sauce) {
      // Determine which button to return
      if (displayEditLink) {
        return (
          <Link to={`/review/edit?s=${sauce.slug}`}>
            <Button displayType="solid">Edit Your Review</Button>
          </Link>
        );
      }

      return (
        <Link to={`/review/add?s=${sauce.slug}`}>
          <Button displayType="solid">Add Review</Button>
        </Link>
      );
    }

    return <p>Loading ....</p>;
  }
}

const mapState2Props = (state: AppState, ownProps: SauceSpotlightProps) => {
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

  // Find the specific sauce for our page and make sure it's full
  const sauce = bySlug[slug];
  if (!sauce || !sauce._full) return { slug };

  // Grab recently reviewed sauces
  const { saucesWithNewestReviews } = state.sauces;

  // If we have reviews, get those too. Else return what we have
  const byReviewID = state.reviews.byReviewID || {};
  const revs = sauce.reviews || [];
  if (
    revs &&
    revs.length > 0 &&
    byReviewID &&
    Object.keys(byReviewID).length > 0
  ) {
    // Push all reviews in reviews array
    const reviews: IReview[] = revs.map(hashID => {
      // push specific review into array
      return byReviewID[hashID];
    });

    // initialize boolean for determing if we should display "Edit Review" button or "Submit Review" instead
    let displayEditLink: boolean = false;
    // Grab user from store
    const user = state.users.self.displayName;
    if (user !== undefined) {
      const len = reviews.length;

      for (let i = 0; i < len; i++) {
        if (reviews[i].author === user) {
          displayEditLink = true;
          break;
        }
      }
    }

    // Return w/ the found reviews
    return { sauce, slug, reviews, saucesWithNewestReviews, displayEditLink };
  }

  // return sauce and slug only
  return { sauce, slug, saucesWithNewestReviews };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  getSauceBySlug: ({ slug }: { slug: string }) =>
    dispatch(getSauceBySlug({ slug }))
});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceSpotlight);
