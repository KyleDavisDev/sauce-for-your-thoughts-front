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
  children: [fakeToggle(), fakeMenu()],
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

  it("matches snapshot", () => {
    mockDropdowns.forEach(mockDropdown => {
      const wrapper = enzyme.shallow(
        <Dropdown {...mockDropdown}>{mockDropdown.children}</Dropdown>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("appends className to parent", () => {
    mockDropdowns.forEach(mockDropdown => {
      const wrapper = enzyme.shallow(
        <Dropdown {...mockDropdown}>{mockDropdown.children}</Dropdown>
      );

      expect(wrapper.first().prop("className")).toEqual(mockDropdown.className);
    });
  });

  it("renders a Toggle component when a component with the name of Toggle is passed", () => {
    const fakeDropdownOnlyToggleChild = (): DropdownProps => ({
      children: [fakeToggle()]
    });
    const mockDropdownsOnlyToggleChild = new Array(ITERATION_SIZE)
      .fill(null)
      .map(fakeDropdownOnlyToggleChild);

    mockDropdownsOnlyToggleChild.forEach(mockDropdown => {
      const wrapper = enzyme.shallow(
        <Dropdown {...mockDropdown}>{mockDropdown.children}</Dropdown>
      );

      expect(wrapper.find("[name='Toggle']").exists()).toBeTruthy();
    });
  });

  // it("renders a Menu component when a component with the name of Menu is passed", () => {
  //   const fakeDropdownOnlyMenuChild = (): DropdownProps => ({
  //     children: [fakeMenu()]
  //   });
  //   const mockDropdownsOnlyMenuChild = new Array(ITERATION_SIZE)
  //     .fill(null)
  //     .map(fakeDropdownOnlyMenuChild);

  //   mockDropdownsOnlyMenuChild.forEach(mockDropdown => {
  //     const wrapper = enzyme.shallow(
  //       <Dropdown {...mockDropdown}>{mockDropdown.children}</Dropdown>
  //     );

  //     console.log(wrapper.debug());

  //     expect(wrapper.find("Menu").exists()).toBeTruthy();
  //   });
  // });
});
