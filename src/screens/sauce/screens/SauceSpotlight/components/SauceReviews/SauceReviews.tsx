import * as React from "react";
import styled from "styled-components";

import { IReview } from "../../../../../../redux/reviews/types";
import { Button } from "../../../../../../components/Button/Button";
import { Link } from "../../../../../../components/Link/Link";
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

export interface SauceReviewsProps {
  slug?: string;
  reviews?: IReview[];
}

class SauceReviews extends React.PureComponent<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    const { reviews } = this.props;
    return (
      <div>
        {reviews && reviews.length > 0 ? (
          reviews.map(review => {
            return <SauceReviewBlock review={review} key={review.hashID} />;
          })
        ) : (
          <StyledContainer>
            <p style={{ marginTop: "0" }}>
              <i>No reviews found! Have you tried this sauce? Add a review!</i>
            </p>
          </StyledContainer>
        )}
        <Link to={`/review/add/?s=${this.props.slug}`}>
          <Button>Add Review</Button>
        </Link>
      </div>
    );
  }
}

export default SauceReviews;
