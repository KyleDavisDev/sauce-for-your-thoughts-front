import {
  StyledContainer,
  StyledDescription,
  StyledEmptyStar,
  StyledFullStar
} from "./RatingBlockStyles";
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
      <StyledContainer>
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
      </StyledContainer>
      <StyledDescription>{txt}</StyledDescription>
    </>
  );
};

export default RatingBlock;
