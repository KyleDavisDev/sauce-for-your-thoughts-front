import * as React from "react";
import * as enzyme from "enzyme";

import Label from "./Label";

describe("<Label />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Label>""</Label>);

    expect(wrapper).toBeTruthy();
  });
});
