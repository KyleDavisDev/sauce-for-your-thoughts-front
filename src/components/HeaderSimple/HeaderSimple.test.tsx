import * as React from "react";
import * as enzyme from "enzyme";

import HeaderSimple from "./HeaderSimple";
import { ITERATION_SIZE } from "../../utils/testUtils/testUtils";

describe("<HeaderSimple />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<HeaderSimple />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<HeaderSimple />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders header tag", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<HeaderSimple />);

      expect(wrapper.find("header")).toBeTruthy();
    });
  });
});
