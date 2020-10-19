import * as React from "react";
import * as enzyme from "enzyme";

import Title from "./Title";
import { ITERATION_SIZE } from "../../../../../../../../utils/testUtils/testUtils";

describe("<Title />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Title>tmp</Title>);

      expect(wrapper).toBeTruthy();
    });
  });
});
