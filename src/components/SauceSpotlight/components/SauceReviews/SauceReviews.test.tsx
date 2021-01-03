import * as React from "react";
import * as enzyme from "enzyme";

import SauceReviews, { SauceReviewsProps } from "./SauceReviews";
import {
  casual,
  fakeReview,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

const fakeSauceReviewBlocks = (): SauceReviewsProps => {
  return {
    reviews: [fakeReview()],
    loading: casual.boolean,
    error: { isVisible: false }
  };
};

describe("<SauceReviews />", () => {
  // defaults from component
  const _loadingTxt = "loading...";
  const _noReviewsFoundTxt =
    "No reviews found! Have you tried this sauce? Add a review!";

  let wrappers: any = [];
  let props: SauceReviewsProps[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate props
      const fakeProp = fakeSauceReviewBlocks();

      // Add props to collector
      props.push(fakeProp);

      return enzyme.shallow(<SauceReviews {...fakeProp} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toMatchSnapshot();
    });
  });

  it("renders loading text when loading is true", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading } = props[ind];

      if (!loading) return;

      expect(wrapper.text()).toContain(_loadingTxt);
    });
  });
});
