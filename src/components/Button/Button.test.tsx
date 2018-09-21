import * as React from "react";
import * as enzyme from "enzyme";

import Button from "./Button";

describe("<Button>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Button />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    const wrapper = enzyme.shallow(<Button>Text here</Button>);
    // expect(wrapper.find(""));
  });
});
