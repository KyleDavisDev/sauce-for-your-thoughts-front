import * as React from "react";
import * as enzyme from "enzyme";

import Footer from "./Footer";
import { ITERATION_SIZE } from "../../utils/testUtils/testUtils";

describe("<Footer />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<Footer />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<Footer />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
