import * as React from "react";
import * as enzyme from "enzyme";

import { Button } from "./Button";

describe("<Button>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <Button onClick={() => {}}>Click me!</Button>
    );
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    let wrapper = enzyme.render(<Button onClick={() => {}}>Text here</Button>);
    expect(wrapper.find("button").text()).toEqual("Text here");

    wrapper = enzyme.render(<Button onClick={() => {}}>Other text</Button>);
    expect(wrapper.find("button").text()).toEqual("Other text");
  });
});
