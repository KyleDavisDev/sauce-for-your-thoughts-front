import * as React from "react";

import { IReview } from "../../../../redux/reviews/types";
import { Button } from "../../../Button/Button";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import {
  StyledContainer,
  StyledDescriptor,
  StyledLink
} from "./SauceReviewsStyles";

export interface SauceReviewsProps {
  slug?: string;
  reviews?: IReview[] | null;
  displayEditLink?: boolean;
}

class SauceReviews extends React.PureComponent<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    const { reviews, displayEditLink, slug } = this.props;

    return (
      <>
        {/* Reviews */}
        <StyledDescriptor title={`Reviews (${reviews ? reviews.length : 0})`}>
          The opinions expressed are soley those of the author.
        </StyledDescriptor>
        <div>
          {reviews && reviews.length > 0 ? (
            reviews.map(review => {
              return <SauceReviewBlock review={review} key={review.reviewID} />;
            })
          ) : (
            <StyledContainer>
              <p style={{ marginTop: "0" }}>
                <i>
                  No reviews found! Have you tried this sauce? Add a review!
                </i>
              </p>
            </StyledContainer>
          )}
          {displayEditLink ? (
            <StyledLink href={`/review/edit?s=${slug}`}>
              <Button>Edit Your Review</Button>
            </StyledLink>
          ) : (
            <StyledLink href={`/review/add?s=${slug}`}>
              <Button>Add Review</Button>
            </StyledLink>
          )}
        </div>
      </>
    );
  }
}

export default SauceReviews;
