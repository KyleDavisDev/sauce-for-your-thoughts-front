import * as React from "react";
import * as enzyme from "enzyme";

import About from "./About";
import { casual, ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<About />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<About />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<About />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("concats classname on parent div", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const extraClasses = casual.string;
      const wrapper = enzyme.shallow(<About className={extraClasses} />);

      expect(wrapper.find("div").props().className).toContain(extraClasses);
    });
  });
});
