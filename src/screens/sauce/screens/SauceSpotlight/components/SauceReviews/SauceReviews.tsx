import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import styled from "styled-components";
import { IReview } from "../../../../../../redux/reviews/types";
import { Button } from "../../../../../../components/Button/Button";
import { Link } from "../../../../../../components/Link/Link";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import { dummyData } from "./dummyData";

const StyledContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  font-family: AvenirNextReg;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

export interface SauceReviewsProps {
  id: string; // This is sauce's id that will have to be looked up
  reviews?: IReview[];
  unfoundReviews?: string[];
}

class SauceReviews extends React.Component<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        {this.props.reviews ? (
          this.props.reviews.map(review => {
            return <SauceReviewBlock review={review} />;
          })
        ) : (
          <StyledContainer>
            <p style={{ marginTop: "0" }}>
              <i>No reviews found! Have you tried this sauce? Add a review!</i>
            </p>
            <Link to={`/review/add/?s=${this.props.id}`}>
              <Button>Add Review</Button>
            </Link>
          </StyledContainer>
        )}
      </div>
    );
  }
}

const mapState2Props = (state: IinitialState, ownProps: SauceReviewsProps) => {
  // Make sure we actually have sauces, the specific sauce for the page we are on, and reviews in the state
  const sauces = state.sauces.byId;
  const reviews = state.reviews.byId;
  if (!sauces || !sauces[ownProps.id] || !reviews) {
    return { reviews: dummyData };
  }

  // Grab the array of ids
  const sauceReviews: string[] | undefined = sauces[ownProps.id].reviews;

  // Maybe no reviews on the sauce yet.
  if (!sauceReviews || sauceReviews.length === 0) {
    return {};
  }

  // Push any unfound ids into this arr so we can try, once more, to look for them.
  // This is a small safety net only
  const unfoundReviews: string[] = [];

  // Loop through list of review ids and find the entire review from redux state
  // TODO: Add pagination if there becomes too many reviews on the page
  const reviewsToRender = sauceReviews.map(ReviewID => {
    if (reviews[ReviewID] === undefined) {
      unfoundReviews.push(ReviewID);
    }
    return reviews[ReviewID];
  });

  return { reviews: reviewsToRender, unfoundReviews };
};

export default connect(mapState2Props)(SauceReviews);
