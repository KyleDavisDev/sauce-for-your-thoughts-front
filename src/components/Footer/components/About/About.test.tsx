import * as React from "react";
import * as enzyme from "enzyme";
import About from "./About";

describe("<About>", () => {
  const wrapper = enzyme.shallow(<About />);

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("renders component's static title", () => {
    expect(
      wrapper
        .find("StyledH5")
        .render()
        .text()
    ).toEqual("About");
  });

  it("renders component's static description", () => {
    expect(
      wrapper
        .find("StyledP")
        .render()
        .text()
    ).toEqual(
      "Ever wonder what a sauce tastes like before buying it? Sauce For Your Thoughts can help! Add, or review, sauces and help out your fellow saucies! Never be blind-sides by a sauce again!"
    );
  });
});
