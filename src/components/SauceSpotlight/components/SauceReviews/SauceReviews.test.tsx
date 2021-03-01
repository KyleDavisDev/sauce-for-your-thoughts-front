import * as React from "react";
import * as enzyme from "enzyme";

import SauceReviews, { SauceReviewsProps } from "./SauceReviews";
import {
  casual,
  fakeReview,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

const reviews = new Array(casual.integer(0, 10))
  .fill(null)
  .map(() => fakeReview());
const fakeSauceReviewBlocks = (): SauceReviewsProps => {
  return {
    reviews: casual.random_element([undefined, reviews]),
    loading: casual.boolean,
    error: { isVisible: casual.boolean, text: casual.string }
  };
};

describe("<SauceReviews />", () => {
  // defaults from component
  const _loadingTxt = "loading...";
  const _noReviewsFoundTxt =
    "No reviews found! Have you tried this sauce? Add a review!";
  const _noResponsibilityText =
    "The opinions expressed are solely those of the author.";

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

  it("renders error text if visible", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading, error } = props[ind];

      if (loading) return; // skip loading components
      if (!error.isVisible) return; // skip non-visible errors

      expect(wrapper.text()).toContain(error.text);
    });
  });

  it("renders no review text if there are no reviews", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading, error, reviews } = props[ind];

      if (loading) return; // skip loading components
      if (error.isVisible) return; // skip visible errors
      if (reviews) return; // skip reviews

      expect(wrapper.text()).toContain(_noReviewsFoundTxt);
    });
  });

  it("renders SauceReviewBlock component for each review", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading, error, reviews } = props[ind];

      if (loading) return; // skip loading components
      if (error.isVisible) return; // skip visible errors
      if (!reviews) return; // skip non-reviews
      if (reviews.length === 0) return; // skip empty set of reviews

      expect(wrapper.find("SauceReviewBlock").length).toEqual(reviews.length);
    });
  });

  it("renders Descriptor component when we have reviews", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading, error, reviews } = props[ind];

      if (loading) return; // skip loading components
      if (error.isVisible) return; // skip visible errors
      if (!reviews) return; // skip non-reviews
      if (reviews.length === 0) return; // skip empty set of reviews

      expect(wrapper.find("Descriptor")).toBeTruthy();
    });
  });

  it("renders passes non-responsibility text to Descriptor component", () => {
    wrappers.forEach((wrapper, ind) => {
      const { loading, error, reviews } = props[ind];

      if (loading) return; // skip loading components
      if (error.isVisible) return; // skip visible errors
      if (!reviews) return; // skip non-reviews
      if (reviews.length === 0) return; // skip empty set of reviews

      expect(wrapper.find("Descriptor").text()).toEqual(_noResponsibilityText);
    });
  });
});
