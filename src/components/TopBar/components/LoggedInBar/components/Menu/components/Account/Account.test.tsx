import * as React from "react";
import * as enzyme from "enzyme";

import Account from "./Account";
import { ITERATION_SIZE } from "../../../../../../../../utils/testUtils/testUtils";

describe("<Account />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
