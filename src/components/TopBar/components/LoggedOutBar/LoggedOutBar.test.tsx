import * as React from "react";
import * as enzyme from "enzyme";

import LoggedOutBar from "./LoggedOutBar";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<LoggedOutBar />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedOutBar />);

      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedOutBar />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders two Link components", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedOutBar />);

      expect(wrapper.find("Link").length).toEqual(2);
    });
  });

  it("first link is for registration", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedOutBar />);

      expect(wrapper.find("Link").first().prop("href")).toContain("register");
    });
  });

  it("last link is for login", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<LoggedOutBar />);

      expect(wrapper.find("Link").last().prop("href")).toContain("login");
    });
  });
});
