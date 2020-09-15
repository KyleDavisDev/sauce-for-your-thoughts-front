import * as React from "react";
import * as enzyme from "enzyme";

import { Overlay } from "./Overlay";

describe("<Overlay />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Overlay>123</Overlay>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Overlay>123</Overlay>);

    expect(wrapper).toMatchSnapshot();
  });
});
