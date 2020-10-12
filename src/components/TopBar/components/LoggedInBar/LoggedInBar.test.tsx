import * as React from "react";
import * as enzyme from "enzyme";

import LoggedInBar from "./LoggedInBar";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<LoggedInBar />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedInBar />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedInBar />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
