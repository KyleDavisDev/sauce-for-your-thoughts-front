import * as React from "react";
import * as enzyme from "enzyme";

import UserDropdown from "./UserDropdown";
import { ITERATION_SIZE } from "../../../../../../utils/testUtils/testUtils";

describe("<UserDropdown />", () => {
  let wrappers: any = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      return enzyme.shallow(<UserDropdown />);
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

  it("renders Toggle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Toggle").exists()).toBeTruthy();
    });
  });
});
