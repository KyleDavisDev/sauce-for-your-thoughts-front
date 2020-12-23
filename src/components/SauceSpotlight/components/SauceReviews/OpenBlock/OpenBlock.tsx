import RatingBlock from "../components/RatingBlock/RatingBlock";
import * as React from "react";
import { IReview } from "../../../../../redux/reviews/types";

export interface IOpenBlock {
  review: IReview;
}

const OpenBlock: React.FC<IOpenBlock> = props => {
  const { review } = props;

  return (
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
  );
};

export default OpenBlock;
