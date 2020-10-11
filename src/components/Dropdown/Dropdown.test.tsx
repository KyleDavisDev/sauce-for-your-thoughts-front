import * as React from "react";
import * as enzyme from "enzyme";

import Dropdown, { DropdownProps } from "./Dropdown";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const fakeToggle = () =>
  React.createElement(
    "div",
    { name: "Toggle", key: casual.uuid },
    fakeJSXElement()
  );

const fakeMenu = () =>
  React.createElement(
    "div",
    { name: "Menu", key: casual.uuid },
    fakeJSXElement()
  );

const fakeDropdown = (): DropdownProps => ({
  children: casual.random_element([
    [fakeToggle()], // pass only a toggle element
    [fakeMenu()], // pass only a menu element
    [fakeToggle(), fakeMenu()] // pass both toggle and menu
  ]),
  className: casual.random_element([undefined, casual.string])
});

const mockDropdowns = new Array(ITERATION_SIZE).fill(null).map(fakeDropdown);

describe("<Dropdown />", () => {
  it("renders", () => {
    mockDropdowns.forEach(mockDropdown => {
      const wrapper = enzyme.shallow(
        <Dropdown {...mockDropdown}>{mockDropdown.children}</Dropdown>
      );

      expect(wrapper).toBeTruthy();
    });
  });
});
