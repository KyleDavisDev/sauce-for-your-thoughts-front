import * as React from "react";
import styled from "styled-components";
import { IReview } from "../../../../../../redux/reviews/types";
import { Button } from "../../../../../../components/Button/Button";
import { Link } from "../../../../../../components/Link/Link";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";

const StyledContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  font-family: AvenirNextReg;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5em;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3em;
  }
`;

export interface SauceReviewsProps {
  slug: string;
  reviews: IReview[];
  unfoundReviews?: string[];
}

class SauceReviews extends React.PureComponent<SauceReviewsProps, any> {
  public constructor(props: SauceReviewsProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        {this.props.reviews ? (
          this.props.reviews.map(review => {
            return <SauceReviewBlock review={review} key={review._id} />;
          })
        ) : (
          <StyledContainer>
            <p style={{ marginTop: "0" }}>
              <i>No reviews found! Have you tried this sauce? Add a review!</i>
            </p>
            <Link to={`/review/add/?s=${this.props.slug}`}>
              <Button>Add Review</Button>
            </Link>
          </StyledContainer>
        )}
      </div>
    );
  }
}

export default SauceReviews;
