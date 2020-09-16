import * as React from "react";
import * as enzyme from "enzyme";

import About from "./About";

describe("<About />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders single h5 tag", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper.find("h5").length).toEqual(1);
  });

  it("renders single p tag", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper.find("p").length).toEqual(1);
  });
});
