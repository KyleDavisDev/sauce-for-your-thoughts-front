import * as React from "react";
import * as enzyme from "enzyme";

import LoggedOutBar from "./LoggedOutBar";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<LoggedOutBar />", () => {
  let wrappers: any = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      return enzyme.shallow(<LoggedOutBar />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders two Link components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Link").length).toEqual(2);
    });
  });

  it("first link is for registration", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Link").first().prop("href")).toContain("register");
    });
  });

  it("last link is for login", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Link").last().prop("href")).toContain("login");
    });
  });
});
