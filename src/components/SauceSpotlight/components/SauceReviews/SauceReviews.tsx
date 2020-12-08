import * as React from "react";

import { useGetReviewsBySlug } from "../../../../utils/hooks/useGetReviewsBySlug/useGetReviewsBySlug";
import { Button } from "../../../Button/Button";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import {
  StyledContainer,
  StyledDescriptor,
  StyledLink
} from "./SauceReviewsStyles";

export interface SauceReviewsProps {}

const SauceReviews: React.FC<SauceReviewsProps> = props => {
  const { loading, reviews, error, getReviews } = useGetReviewsBySlug();

  React.useEffect(() => {
    if (!loading && reviews.length === 0) getReviews();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (reviews.length === 0) {
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
        The opinions expressed are soley those of the author.
      </StyledDescriptor>
      <div>
        {reviews.map(review => {
          return <SauceReviewBlock review={review} key={review.reviewID} />;
        })}
        {/* {displayEditLink ? (
          <StyledLink href={`/review/edit?s=${slug}`}>
            <Button>Edit Your Review</Button>
          </StyledLink>
        ) : (
          <StyledLink href={`/review/add?s=${slug}`}>
            <Button>Add Review</Button>
          </StyledLink>
        )} */}
      </div>
    </>
  );
};

export default SauceReviews;
