import * as React from "react";
import ReactRating from "react-rating";
import { useSelector } from "react-redux";
import { IUser } from "../../../../../../redux/users/types";
import { AppState } from "../../../../../../redux/configureStore";
import { IReview } from "../../../../../../redux/reviews/types";
import {
  StyledButton,
  StyledContainer,
  StyledContentContainer
} from "./SauceReviewBlockStyle";
import RatingBlock from "../RatingBlock/RatingBlock";
import AuthorBlock from "../AuthorBlock/AuthorBlock";
import OpenBlock from "../../OpenBlock/OpenBlock";

export interface SauceReviewBlockProps {
  review: IReview;
  author?: IUser;
}

const SauceReviewBlock: React.FunctionComponent<SauceReviewBlockProps> = props => {
  // assign state
  const [isOpen, setIsOpen] = React.useState(false);

  const review: IReview = props.review;

  return (
    <StyledContainer>
      <StyledButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "_" : "+"}
      </StyledButton>

      <StyledContentContainer>
        <AuthorBlock {...review} />

        {/* Show content if state allows it otherwise show empty */}
        {isOpen ? (
          <OpenBlock review={review} />
        ) : (
          /* Overall */
          <RatingBlock name="Overall" {...review.overall} />
        )}
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default SauceReviewBlock;
