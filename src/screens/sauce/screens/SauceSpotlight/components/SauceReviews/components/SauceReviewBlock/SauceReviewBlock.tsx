import * as React from "react";
import { connect } from "react-redux";
import ReactRating from "react-rating";
import { IReview } from "../../../../../../../../redux/reviews/types";
import styled from "styled-components";
import { IinitialState } from "Users/kylebonar/Documents/projects/sites/now-thats-delicious-front/src/redux/configureStore";
import Star from "../../../../../../../../images/icons/Star";

const StyledContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  font-family: AvenirNextReg;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 1em;
`;

const StyledToggleContainer = styled.div`
  background-color: blue;
  padding: 0.75em;

  &:hover,
  &:focus {
    background-color: yellow;
    cursor: pointer;
  }
`;

const StyledContentContainer = styled.div`
  padding: 0.75em;
`;

const StyledReviewContainer = styled.div`
  margin: 0.5em;
`;

const StyledCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 1em;

  > i {
    padding: 0 1em 0 0;
  }
`;

const StyledEmptyStar = styled(Star)`
  .border {
    fill: ${props => props.theme.primaryThemeColor};
  }

  .center {
    fill: transparent;
  }
`;

const StyledCategoryDescription = styled.p`
  margin-top: 0px;
  padding: 0 2em;
`;

const StyledFullStar = styled(Star)`
  .border,
  .center {
    fill: ${props => props.theme.primaryThemeColor};
  }
`;

export interface SauceReviewBlockProps {
  review: IReview;
  author?: string;
}

export interface SauceReviewBlockState {
  isOpen: boolean; // Will be our toggle
}

class SauceReviewBlock extends React.Component<
  SauceReviewBlockProps,
  SauceReviewBlockState
> {
  constructor(props: SauceReviewBlockProps) {
    super(props);

    this.state = { isOpen: true };
  }

  public render() {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long"
    };
    const review: IReview = this.props.review;
    return (
      <StyledContainer>
        <StyledToggleContainer>
          {this.state.isOpen ? "+" : "-"}
        </StyledToggleContainer>
        <StyledContentContainer>
          <i>Reviewer:</i> {this.props.author} on{" "}
          {new Date(review.created).toLocaleDateString("en-US", dateOptions)}
          <StyledReviewContainer>
            {review.aroma && (
              <div>
                <StyledCategoryContainer>
                  <i>Aroma: </i>{" "}
                  <ReactRating
                    initialRating={review.aroma.rating}
                    readonly={true}
                    emptySymbol={<StyledEmptyStar height={20} />}
                    fullSymbol={<StyledFullStar height={20} />}
                  />
                </StyledCategoryContainer>
                <StyledCategoryDescription>
                  {review.aroma.txt}
                </StyledCategoryDescription>
              </div>
            )}
          </StyledReviewContainer>
        </StyledContentContainer>
      </StyledContainer>
    );
  }
}

const mapState2Props = (
  state: IinitialState,
  ownProps: SauceReviewBlockProps
) => {
  // Make sure we have authors, and specifically the author we want, in redux
  if (!state.users.byId || !state.users.byId[ownProps.review.author._id]) {
    return { author: "N/A" };
  }

  // Get the name of the author via the author's _id
  const author: string =
    state.users.byId[ownProps.review.author._id].name || "N/A";
  return { author };
};

export default connect(mapState2Props)(SauceReviewBlock);
