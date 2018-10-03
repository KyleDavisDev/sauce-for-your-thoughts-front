import * as React from "react";
import * as enzyme from "enzyme";
import PageTitle from "./PageTitle";

describe("<PageTitle />", () => {
  const children = ["child1", "different text", "Third rANDom text"];
  const wrapper = enzyme.shallow(<PageTitle>{children[0]}</PageTitle>);

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("renders correct tag", () => {
    expect(wrapper.find("StyledH1")).toBeTruthy();
    expect(wrapper.find("StyledH1").length).toEqual(1);
  });
});
