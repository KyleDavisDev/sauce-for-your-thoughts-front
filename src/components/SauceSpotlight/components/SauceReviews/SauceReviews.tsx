import * as React from "react";
import styled from "styled-components";

import { IReview } from "../../../../redux/reviews/types";
import { Button } from "../../../Button/Button";
import { Link } from "../../../Link/Link";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";

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
  displayEditLink?: boolean;
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

export default SauceReviews;
