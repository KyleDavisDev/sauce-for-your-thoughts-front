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
import RatingBlock from "../RatingBlock/RatingBlock";

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
            {review.overall && (
              <RatingBlock
                name="Overall"
                txt={review.overall.txt}
                rating={review.overall.rating}
              />
            )}
            {/* Aroma */}
            {review.aroma && (review.aroma.rating > 0 || review.aroma.txt) && (
              <RatingBlock
                name="Aroma"
                txt={review.aroma.txt}
                rating={review.aroma.rating}
              />
            )}
            {/* Taste */}
            {review.taste && (review.taste.rating > 0 || review.taste.txt) && (
              <RatingBlock
                name="Taste"
                txt={review.taste.txt}
                rating={review.taste.rating}
              />
            )}
            {/* Label */}
            {review.label && (review.label.rating > 0 || review.label.txt) && (
              <RatingBlock
                name="Label"
                txt={review.label.txt}
                rating={review.label.rating}
              />
            )}
            {/* Heat */}
            {review.heat && (review.heat.rating > 0 || review.heat.txt) && (
              <RatingBlock
                name="Heat"
                txt={review.heat.txt}
                rating={review.heat.rating}
              />
            )}
            {/* Note */}
            {review.note && review.note.txt && (
              <RatingBlock name="Note" txt={review.note.txt} />
            )}
          </div>
        ) : (
          /* Overall */
          review.overall && (
            <>
              <RatingBlock
                name="Overall"
                txt={review.overall.txt}
                rating={review.overall.rating}
              />
            </>
          )
        )}
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default SauceReviewBlock;
