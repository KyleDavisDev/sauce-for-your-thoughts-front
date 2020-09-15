import * as React from "react";
import * as enzyme from "enzyme";

import { Overlay } from "./Overlay";

describe("<Overlay />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Overlay></Overlay>);

    expect(wrapper).toBeTruthy();
  });
});
