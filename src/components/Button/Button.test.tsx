import * as React from "react";
import * as enzyme from "enzyme";

import { Button } from "./Button";
import { fakeButtons } from "../../utils/testUtils/testUtils";

const mockButtons = fakeButtons();

describe("<Button>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Button>test</Button>);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockButtons.forEach(mockButton => {
      const wrapper = enzyme.shallow(
        <Button {...mockButton}>{mockButton.children}</Button>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct text", () => {
    let wrapper = enzyme.render(<Button onClick={() => {}}>Text here</Button>);
    expect(wrapper.find("button").text()).toEqual("Text here");

    wrapper = enzyme.render(<Button onClick={() => {}}>Other text</Button>);
    expect(wrapper.find("button").text()).toEqual("Other text");
  });
});
