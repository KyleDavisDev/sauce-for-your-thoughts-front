import * as React from "react";
import * as enzyme from "enzyme";

import OpenBlock, { IOpenBlock } from "./OpenBlock";

import {
  fakeReview,
  ITERATION_SIZE
} from "../../../../../utils/testUtils/testUtils";

const fakeSauceReviewBlocks = (): IOpenBlock => {
  return {
    review: fakeReview()
  };
};

describe("<OpenBlock />", () => {
  let wrappers: any = [];
  let props: IOpenBlock[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate props
      const fakeProp = fakeSauceReviewBlocks();

      // Add props to collector
      props.push(fakeProp);

      return enzyme.shallow(<OpenBlock {...fakeProp} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
