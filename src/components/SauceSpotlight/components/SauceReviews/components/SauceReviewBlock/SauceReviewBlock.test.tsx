import * as React from "react";
import * as enzyme from "enzyme";

import SauceReviewBlock, { SauceReviewBlockProps } from "./SauceReviewBlock";

import {
  fakeReview,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

const fakeSauceReviewBlocks = (): SauceReviewBlockProps => {
  return {
    review: fakeReview()
  };
};

describe("<SauceReviewBlock />", () => {
  let wrappers: any = [];
  let props: SauceReviewBlockProps[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate props
      const fakeProp = fakeSauceReviewBlocks();

      // Add props to collector
      props.push(fakeProp);

      return enzyme.shallow(<SauceReviewBlock {...fakeProp} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Button component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Button").exists()).toBeTruthy();
    });
  });

  it("renders an AuthorBlock component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("AuthorBlock").exists()).toBeTruthy();
    });
  });

  it("passes expected params to the AuthorBlock component", () => {
    wrappers.forEach((wrapper, ind) => {
      const { created, author } = props[ind].review;

      const authorBlock = wrapper.find("AuthorBlock");
      expect(authorBlock.prop("created")).toEqual(created);
      expect(authorBlock.prop("author")).toEqual(author);
    });
  });

  it("renders a RatingBlock component by default", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("RatingBlock").exists()).toBeTruthy();
    });
  });

  it("renders a OpenBlock component after Button component has been clicked", () => {
    wrappers.forEach(wrapper => {
      // no component
      expect(wrapper.find("OpenBlock").exists()).toBeFalsy();

      // simulate click
      wrapper.find("Button").simulate("click");

      // Can find the button now
      expect(wrapper.find("OpenBlock").exists()).toBeTruthy();
    });
  });

  it("passes expected params to OpenBlock component", () => {
    wrappers.forEach((wrapper, ind) => {
      const { review } = props[ind];

      // if the component can't be found, then simulate a click
      if (!wrapper.find("OpenBlock").exists()) {
        wrapper.find("Button").simulate("click");
      }

      expect(wrapper.find("OpenBlock").prop("review")).toEqual(review);
    });
  });

  it("passes expected params to RatingBlock component", () => {
    wrappers.forEach((wrapper, ind) => {
      const { review } = props[ind];

      // if the component can't be found, then simulate a click
      if (!wrapper.find("RatingBlock").exists()) {
        wrapper.find("Button").simulate("click");
      }

      expect(wrapper.find("RatingBlock").prop("name")).toEqual("Overall");
      expect(wrapper.find("RatingBlock").prop("txt")).toEqual(
        review.overall.txt
      );
      expect(wrapper.find("RatingBlock").prop("rating")).toEqual(
        review.overall.rating
      );
    });
  });
});
