import * as React from "react";

import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import { StyledContainer, StyledDescriptor } from "./SauceReviewsStyles";
import { IReview } from "../../../../redux/reviews/types";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";

export interface SauceReviewsProps {
  reviews?: IReview[];
  loading: boolean;
  error: FlashMessageProps;
}

const SauceReviews: React.FC<SauceReviewsProps> = props => {
  const { reviews, loading, error } = props;

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <StyledContainer>
        <p style={{ marginTop: "0" }}>
          <i>No reviews found! Have you tried this sauce? Add a review!</i>
        </p>
      </StyledContainer>
    );
  }

  return (
    <>
      {/* Reviews */}
      <StyledDescriptor title={`Reviews (${reviews ? reviews.length : 0})`}>
        The opinions expressed are solely those of the author.
      </StyledDescriptor>
      <div>
        {reviews.map(review => {
          return <SauceReviewBlock review={review} key={review.reviewID} />;
        })}
      </div>
    </>
  );
};

export default SauceReviews;
