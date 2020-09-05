import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import { Button } from "./Button";
import { fakeButtons } from "../../utils/testUtils/testUtils";
import { MockButton } from "../../utils/testUtils/types";

// generate series of mock buttons
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

  it("renders correct text for non-array children", () => {
    mockButtons.forEach((mockButton: MockButton) => {
      const wrapper = enzyme.mount(
        <Button {...mockButton}>{mockButton.children}</Button>
      );

      if (Array.isArray(mockButton.children)) {
        return;
      }

      if (typeof mockButton.children === "string") {
        expect(wrapper.text()).toEqual(mockButton.children);
        return;
      }

      expect(wrapper.text()).toEqual(mockButton.children.props.children);
    });
  });
});
