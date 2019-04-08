import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { IReview } from "../../../../../../redux/reviews/types";
import { Button } from "../../../../../../components/Button/Button";
import { Link } from "../../../../../../components/Link/Link";
import SauceReviewBlock from "./components/SauceReviewBlock/SauceReviewBlock";
import { IinitialState } from "../../../../../../redux/configureStore";

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
  reviews?: IReview[];
  unfoundReviews?: string[];
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
            // return <SauceReviewBlock review={review} key={review._id} />;
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

const mapState2Props = (state: IinitialState, ownProps: SauceReviewsProps) => {
  // console.log(state, ownProps);
  return {};
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(SauceReviews);
