import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import styled from "styled-components";
import { IReview } from "../../../../../../redux/reviews/types";

const StyledSauceContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

export interface SauceReviewsProps {
  id: string; // This is sauce's id that will have to be looked up
  reviews: IReview[];
  unfoundReviews?: number[];
}

class SauceReviews extends React.Component<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    return <StyledSauceContainer>yo</StyledSauceContainer>;
  }
}

const mapState2Props = (state: IinitialState, ownProps: SauceReviewsProps) => {
  // Make sure we actually have sauces and reviews in the state
  const sauces = state.sauces.byId;
  const reviews = state.reviews.byId;
  if (!sauces || !reviews) {
    return {};
  }

  // Grab the array of ids
  const sauceReviews: string[] | undefined = sauces[ownProps.id].reviews;

  // Maybe no reviews on the sauce yet.
  if (!sauceReviews || sauceReviews.length === 0) {
    return { reviews: [] };
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

  return { reviews: reviewsToRender };
};

export default connect(mapState2Props)(SauceReviews);
