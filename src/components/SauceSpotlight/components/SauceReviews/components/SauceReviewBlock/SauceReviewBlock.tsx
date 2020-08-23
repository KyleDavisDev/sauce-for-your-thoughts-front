import * as React from "react";
import ReactRating from "react-rating";
import { useSelector } from "react-redux";
import { IUser } from "../../../../../../redux/users/types";
import { AppState } from "../../../../../../redux/configureStore";
import { IReview } from "../../../../../../redux/reviews/types";
import {
  StyledAvatar,
  StyledButton,
  StyledCategoryContainer,
  StyledCategoryDescription,
  StyledContainer,
  StyledContentContainer,
  StyledEmptyStar,
  StyledFullStar,
  StyledReviewerContainer,
  StyledReviewer
} from "./SauceReviewBlockStyle";

export interface SauceReviewBlockProps {
  review: IReview;
  author?: IUser;
}

export interface SauceReviewBlockState {
  isOpen: boolean; // Will be our toggle
}

const SauceReviewBlock: React.FunctionComponent<SauceReviewBlockProps> = props => {
  // assign state
  const [isOpen, setIsOpen] = React.useState(false);

  const dateOptions = {
    day: "numeric",
    year: "numeric",
    month: "long"
  };

  const review: IReview = props.review;

  const author = useSelector((store: AppState) =>
    store.users.byDisplayName ? store.users.byDisplayName[review.author] : null
  );

  return (
    <StyledContainer>
      <StyledButton onClick={e => setIsOpen(!isOpen)}>
        {isOpen ? "_" : "+"}
      </StyledButton>

      <StyledContentContainer>
        <StyledReviewerContainer>
          <i>Reviewer:</i>
          {author ? (
            <StyledReviewer>
              {author.displayName}
              <StyledAvatar src={author.avatarURL} />
            </StyledReviewer>
          ) : (
            "N/A"
          )}{" "}
          on {/* Convert epoch to human-readable */}
          {new Date(review.created * 1000).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </StyledReviewerContainer>

        {/* Show content if state allows it otherwise show empty */}
        {isOpen ? (
          <div>
            {/* Overall */}
            {review.overall &&
              RatingDisplay({
                name: "Overall",
                txt: review.overall.txt,
                rating: review.overall.rating
              })}

            {/* Aroma */}
            {review.aroma &&
              (review.aroma.rating > 0 || review.aroma.txt) &&
              RatingDisplay({
                name: "Aroma",
                txt: review.aroma.txt,
                rating: review.aroma.rating
              })}

            {/* Taste */}
            {review.taste &&
              (review.taste.rating > 0 || review.taste.txt) &&
              RatingDisplay({
                name: "Taste",
                txt: review.taste.txt,
                rating: review.taste.rating
              })}

            {/* Label */}
            {review.label &&
              (review.label.rating > 0 || review.label.txt) &&
              RatingDisplay({
                name: "Label",
                txt: review.label.txt,
                rating: review.label.rating
              })}

            {/* Heat */}
            {review.heat &&
              (review.heat.rating > 0 || review.heat.txt) &&
              RatingDisplay({
                name: "Heat",
                txt: review.heat.txt,
                rating: review.heat.rating
              })}

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
            <>
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
            </>
          )
        )}
      </StyledContentContainer>
    </StyledContainer>
  );
};

function RatingDisplay({ txt, rating, name }) {
  return (
    <>
      <StyledCategoryContainer>
        <i>{name}:</i>
        <ReactRating
          initialRating={rating}
          readonly={true}
          emptySymbol={<StyledEmptyStar height={20} />}
          fullSymbol={<StyledFullStar height={20} />}
        />{" "}
        <small>({rating.toString()})</small>
      </StyledCategoryContainer>
      <StyledCategoryDescription>{txt}</StyledCategoryDescription>
    </>
  );
}

export default SauceReviewBlock;
