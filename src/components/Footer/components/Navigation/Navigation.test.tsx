import * as React from "react";
import * as enzyme from "enzyme";

import Navigation from "./Navigation";

describe("<Navigation />", () => {
  it("renders", () => {
    const wrapper = enzyme.render(<Navigation />);
    expect(wrapper).toBeTruthy();
  });

  it("has correct title", () => {
    const wrapper = enzyme.render(<Navigation />);
    expect(wrapper.find("h5").text()).toEqual("Navigation");
  });
});
