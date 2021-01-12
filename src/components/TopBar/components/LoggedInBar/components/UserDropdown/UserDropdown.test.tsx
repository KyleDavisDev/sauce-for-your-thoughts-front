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

  afterEach(() => {
    // Close Menu if open
    wrappers.forEach(wrapper => {
      if (wrapper.find("Menu").exists()) {
        wrapper.find("Toggle").simulate("click");
      }
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

  it("renders Toggle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Toggle").exists()).toBeTruthy();
    });
  });

  it("does not render Menu component initially", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Menu").exists()).toBeFalsy();
    });
  });

  it("renders Menu component after Toggle is clicked", () => {
    wrappers.forEach(wrapper => {
      wrapper.find("Toggle").simulate("click");

      expect(wrapper.find("Menu").exists()).toBeTruthy();
    });
  });
});
