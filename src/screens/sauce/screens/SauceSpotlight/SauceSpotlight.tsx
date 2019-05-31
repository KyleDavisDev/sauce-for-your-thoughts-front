import * as React from "react";
import { connect } from "react-redux";
import queryString, { OutputParams } from "query-string";

import { AppState } from "../../../../redux/configureStore";
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
  getSauceBySlug: ({ data }: { data: { sauce: { slug: string } } }) => any;
  slug?: string;
  saucesWithNewestReviews?: Array<{ name: string; slug: string }>;
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

    // If we don't have sauce, go look for it
    if (!this.props.sauce) {
      // Go look for sauce data
      this.props.getSauceBySlug({ data }).catch((err: any) => console.log(err));
    }
  }

  public render() {
    const { sauce, reviews, saucesWithNewestReviews } = this.props;

    return (
      <div>
        <TopBar />
        <Navigation />

        <StyledArticle>
          <StyledLeftContainer>
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
            {sauce && (
              <Link to={`/review/add/?s=${sauce.slug}`}>
                <Button displayType="solid">Add Review</Button>
              </Link>
            )}
            {sauce && sauce._related && sauce._related.length > 0 && (
              <List
                items={sauce._related.map(x => {
                  return { link: x.slug, text: x.name };
                })}
                title="Related Sauces"
              />
            )}
            {saucesWithNewestReviews && saucesWithNewestReviews.length > 0 && (
              <List
                items={saucesWithNewestReviews.map(x => {
                  return { link: x.slug, text: x.name };
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
  const byHashID = state.reviews.byHashID || {};
  const revs = sauce.reviews || [];
  if (revs && revs.length > 0 && byHashID && Object.keys(byHashID).length > 0) {
    // Push all reviews in reviews array
    const reviews: IReview[] = revs.map(hashID => {
      // push specific review into array
      return byHashID[hashID];
    });

    // Return w/ the found reviews
    return { sauce, slug, reviews, saucesWithNewestReviews };
  }

  // return sauce and slug only
  return { sauce, slug, saucesWithNewestReviews };
};

const mapDispatch2Props = {
  getSauceBySlug
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceSpotlight);
