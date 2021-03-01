import * as React from "react";
import * as enzyme from "enzyme";

import LoggedInBar from "./LoggedInBar";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<LoggedInBar />", () => {
  let wrappers: any = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      return enzyme.shallow(<LoggedInBar />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders UserDropdown component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("UserDropdown").exists()).toBeTruthy();
    });
  });
});
