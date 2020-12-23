import {
  StyledCategoryContainer,
  StyledCategoryDescription,
  StyledEmptyStar,
  StyledFullStar
} from "../SauceReviewBlock/SauceReviewBlockStyle";
import ReactRating from "react-rating";
import * as React from "react";

export interface IRatingBlock {
  txt?: string;
  rating?: number;
  name: string;
}

const RatingBlock = ({ txt, rating, name }: IRatingBlock): JSX.Element => {
  return (
    <>
      <StyledCategoryContainer>
        <i>{name}:</i>

        {rating && (
          <>
            <ReactRating
              initialRating={rating}
              readonly={true}
              emptySymbol={<StyledEmptyStar height={20} />}
              fullSymbol={<StyledFullStar height={20} />}
            />{" "}
            <small>({rating.toString()})</small>
          </>
        )}
      </StyledCategoryContainer>
      <StyledCategoryDescription>{txt}</StyledCategoryDescription>
    </>
  );
};

export default RatingBlock;
