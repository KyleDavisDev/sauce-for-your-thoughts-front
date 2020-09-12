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

  it("renders correct children", () => {
    const wrapper = enzyme.shallow(<Label>abc</Label>);

    expect(wrapper.props().children).toEqual("abc");
  });
});
