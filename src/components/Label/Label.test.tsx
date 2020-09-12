import * as React from "react";
import * as enzyme from "enzyme";

import Label from "./Label";
// import { fakeLabels } from "../../utils/testUtils/testUtils";
// import { MockLabel } from "../../utils/testUtils/types";

// const mockLabels = fakeLabels();

describe("<Label />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Label>""</Label>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Label>""</Label>);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correct children", () => {
    const wrapper = enzyme.shallow(<Label>abc</Label>);

    expect(wrapper.props().children).toEqual("abc");
  });

  it("renders correct htmlFor tag", () => {
    const htmlFor = "abc";
    const wrapper = enzyme.shallow(<Label htmlFor={htmlFor}>abc</Label>);

    expect(wrapper.props().htmlFor).toEqual(htmlFor);
  });
});
