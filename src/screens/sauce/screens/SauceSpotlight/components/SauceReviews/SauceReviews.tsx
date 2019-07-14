import * as React from "react";
import styled from "styled-components";

import { IReview } from "../../../../../../redux/reviews/types";
import { Button } from "../../../../../../components/Button/Button";
import { Link } from "../../../../../../components/Link/Link";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import { connect } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";

const StyledContainer = styled.div`
  font-family: AvenirNextReg;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1.5em;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3em;
  }
`;

const StyledLink = styled(Link)`
  > div {
    display: inline;
  }
`;

export interface SauceReviewsProps {
  slug?: string;
  reviews?: IReview[];
  displayEditLink: boolean;
}

class SauceReviews extends React.PureComponent<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    const { reviews, displayEditLink, slug } = this.props;

    return (
      <div>
        {reviews && reviews.length > 0 ? (
          reviews.map(review => {
            return <SauceReviewBlock review={review} key={review.reviewID} />;
          })
        ) : (
          <StyledContainer>
            <p style={{ marginTop: "0" }}>
              <i>No reviews found! Have you tried this sauce? Add a review!</i>
            </p>
          </StyledContainer>
        )}
        {displayEditLink ? (
          <StyledLink to={`/review/edit?s=${slug}`}>
            <Button>Edit Your Review</Button>
          </StyledLink>
        ) : (
          <StyledLink to={`/review/add?s=${slug}`}>
            <Button>Add Review</Button>
          </StyledLink>
        )}
      </div>
    );
  }
}

const mapState2Props = (state: AppState, ownProps: SauceReviewsProps) => {
  // Grab user from store
  const user = state.users.self.displayName;
  // If no user, return normal props
  if (!user) return { ...ownProps };

  // Grab reviews
  const reviews = ownProps.reviews;
  // If no reviews, return
  if (!reviews) return { ...ownProps };

  let displayEditLink: boolean = false;
  const len = reviews.length;
  for (let i = 0; i < len; i++) {
    if (reviews[i].author === user) {
      displayEditLink = true;
      break;
    }
  }

  return { ...ownProps, displayEditLink };
};

export default connect(
  mapState2Props,
  null
)(SauceReviews);
