import * as React from "react";
import { connect } from "react-redux";
import ReactRating from "react-rating";
import { IReview } from "../../../../../../../../redux/reviews/types";
import { AppState } from "../../../../../../../../redux/configureStore";
import {
  StyledContainer,
  StyledButton,
  StyledContentContainer,
  StyledCategoryContainer,
  StyledCategoryDescription,
  StyledEmptyStar,
  StyledFullStar
} from "./SauceReviewBlockStyle";

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

    this.state = { isOpen: false };
  }

  public render() {
    const dateOptions = {
      day: "numeric",
      year: "numeric",
      month: "long"
    };
    const review: IReview = this.props.review;
    return (
      <StyledContainer>
        <StyledButton onClick={this.onToggleClick}>
          {this.state.isOpen ? "_" : "+"}
        </StyledButton>

        <StyledContentContainer>
          <i>Reviewer:</i> {this.props.author} on{" "}
          {/* Convert epoch to human-readable */}
          {new Date(review.created * 1000).toLocaleDateString(
            "en-US",
            dateOptions
          )}
          {/* Show content if state allows it otherwise show empty */}
          {this.state.isOpen ? (
            <div>
              {/* Overall */}
              {review.overall && (
                <div>
                  <StyledCategoryContainer>
                    <i>Overall:</i>
                    <ReactRating
                      initialRating={review.overall.rating}
                      readonly={true}
                      emptySymbol={<StyledEmptyStar height={20} />}
                      fullSymbol={<StyledFullStar height={20} />}
                    />{" "}
                    <small>({review.overall.rating.toString()})</small>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.overall.txt}
                  </StyledCategoryDescription>
                </div>
              )}
              {/* Aroma */}
              {review.aroma && (
                <div>
                  <StyledCategoryContainer>
                    <i>Aroma:</i>
                    <ReactRating
                      initialRating={review.aroma.rating}
                      readonly={true}
                      emptySymbol={<StyledEmptyStar height={20} />}
                      fullSymbol={<StyledFullStar height={20} />}
                    />{" "}
                    <small>({review.aroma.rating.toString()})</small>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.aroma.txt}
                  </StyledCategoryDescription>
                </div>
              )}

              {/* Taste */}
              {review.taste && (
                <div>
                  <StyledCategoryContainer>
                    <i>Taste:</i>
                    <ReactRating
                      initialRating={review.taste.rating}
                      readonly={true}
                      emptySymbol={<StyledEmptyStar height={20} />}
                      fullSymbol={<StyledFullStar height={20} />}
                    />{" "}
                    <small>({review.taste.rating.toString()})</small>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.taste.txt}
                  </StyledCategoryDescription>
                </div>
              )}

              {/* Label */}
              {review.label && (
                <div>
                  <StyledCategoryContainer>
                    <i>Label:</i>
                    <ReactRating
                      initialRating={review.label.rating}
                      readonly={true}
                      emptySymbol={<StyledEmptyStar height={20} />}
                      fullSymbol={<StyledFullStar height={20} />}
                    />{" "}
                    <small>({review.label.rating.toString()})</small>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.label.txt}
                  </StyledCategoryDescription>
                </div>
              )}

              {/* Heat */}
              {review.heat && (
                <div>
                  <StyledCategoryContainer>
                    <i>Heat:</i>
                    <ReactRating
                      initialRating={review.heat.rating}
                      readonly={true}
                      emptySymbol={<StyledEmptyStar height={20} />}
                      fullSymbol={<StyledFullStar height={20} />}
                    />{" "}
                    <small>({review.heat.rating.toString()})</small>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.heat.txt}
                  </StyledCategoryDescription>
                </div>
              )}

              {/* Note */}
              {review.note && review.note.txt && (
                <div>
                  <StyledCategoryContainer>
                    <i>Note:</i>
                  </StyledCategoryContainer>
                  <StyledCategoryDescription>
                    {review.note.txt}
                  </StyledCategoryDescription>
                </div>
              )}
            </div>
          ) : (
            /* Overall */
            review.overall && (
              <div>
                <StyledCategoryContainer>
                  <i>Overall:</i>
                  <ReactRating
                    initialRating={review.overall.rating}
                    readonly={true}
                    emptySymbol={<StyledEmptyStar height={20} />}
                    fullSymbol={<StyledFullStar height={20} />}
                  />{" "}
                  <small>({review.overall.rating.toString()})</small>
                </StyledCategoryContainer>
              </div>
            )
          )}
        </StyledContentContainer>
      </StyledContainer>
    );
  }

  public onToggleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const isOpen: boolean = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  };
}

const mapState2Props = (state: AppState, ownProps: SauceReviewBlockProps) => {
  // Make sure we have authors, and specifically the author we want, in redux
  if (
    !state.users.byDisplayName ||
    !state.users.byDisplayName[ownProps.review.author]
  ) {
    return { author: "N/A" };
  }

  // Get the name of the author via the author's _id
  const author: string =
    state.users.byDisplayName[ownProps.review.author].displayName || "N/A";
  return { author };
};

export default connect(mapState2Props)(SauceReviewBlock);
