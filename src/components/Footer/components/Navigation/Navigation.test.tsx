import * as React from "react";
import * as enzyme from "enzyme";

import Navigation from "./Navigation";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<Navigation />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.render(<Navigation />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.render(<Navigation />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
