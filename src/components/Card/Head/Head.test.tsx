import * as React from "react";
import * as enzyme from "enzyme";

import Head, { IHeadProps } from "./Head";

describe("<Head />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Head to="" />);

    expect(wrapper).toBeTruthy();
  });
});
