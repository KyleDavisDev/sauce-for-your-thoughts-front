import * as React from "react";
import * as enzyme from "enzyme";

import SauceReviewBlock, { SauceReviewBlockProps } from "./SauceReviewBlock";
import { IReview } from "../../../../../../redux/reviews/types";
import {
  fakeReview,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

describe("<SauceReviewBlock />", () => {
  let wrappers: any = [];
  let reviews: IReview[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate review
      const review = fakeReview();

      // Add review to collector
      reviews.push(review);

      return enzyme.shallow(<SauceReviewBlock review={review} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
