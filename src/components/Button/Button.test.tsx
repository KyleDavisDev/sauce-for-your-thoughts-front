import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import { Button, ButtonProps } from "./Button";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const mockButton = (): ButtonProps => ({
  children: casual.random_element([fakeJSXElement(), casual.text]),
  displayType: casual.random_element(["outline", "solid"]),
  className: casual.string,
  type: casual.random_element(["button", "submit", "reset"]),
  onClick: jest.fn(),
  style: undefined,
  disabled: casual.boolean
});

// generate series of mock buttons
const mockButtons = new Array(ITERATION_SIZE).fill(null).map(mockButton);

describe("<Button>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Button>test</Button>);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockButtons.forEach((mockButton: ButtonProps) => {
      const wrapper = enzyme.shallow(
        <Button {...mockButton}>{mockButton.children}</Button>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct text for non-array children", () => {
    mockButtons.forEach((mockButton: ButtonProps) => {
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

  it("calls onCall when clicked", () => {
    mockButtons.forEach(mockButton => {
      const wrapper = enzyme.shallow(
        <Button {...mockButton}>{mockButton.children}</Button>
      );

      // simulate click
      wrapper.simulate("click");

      // check was clicked
      expect(mockButton.onClick).toBeCalledTimes(1);
    });
  });
});
