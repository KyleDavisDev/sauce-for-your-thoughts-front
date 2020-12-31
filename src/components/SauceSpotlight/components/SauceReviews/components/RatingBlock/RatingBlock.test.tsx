import * as React from "react";
import * as enzyme from "enzyme";

import RatingBlock, { IRatingBlock } from "./RatingBlock";
import {
  ITERATION_SIZE,
  casual
} from "../../../../../../utils/testUtils/testUtils";

const fakeRatingBlockProps = (): IRatingBlock => {
  return {
    txt: casual.random_element([undefined, casual.string]),
    rating: casual.random_element([undefined, casual.integer(1, 5)]),
    name: casual.string
  };
};

describe("<RatingBlock />", () => {
  let wrappers: any = [];
  let props: IRatingBlock[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      const fakeProps = fakeRatingBlockProps();
      props.push(fakeProps);

      return enzyme.shallow(<RatingBlock {...fakeProps} />);
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

  it("renders expected name", () => {
    wrappers.forEach((wrapper, ind) => {
      const { name } = props[ind];

      expect(wrapper.text()).toContain(name);
    });
  });

  it("renders ReactRating component if rating exists", () => {
    wrappers.forEach((wrapper, ind) => {
      const { rating } = props[ind];
      if (!rating) return;

      expect(wrapper.find("RatingAPILayer").exists()).toBeTruthy();
    });
  });

  it("renders expected rating value if rating exists", () => {
    wrappers.forEach((wrapper, ind) => {
      const { rating } = props[ind];
      if (!rating) return;

      expect(wrapper.text()).toContain(rating.toString());
    });
  });
});
