import * as React from "react";
import * as enzyme from "enzyme";

import Dropdown, { DropdownProps } from "./Dropdown";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const fakeDropdown = (): DropdownProps => ({
  children: [fakeJSXElement()],
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
