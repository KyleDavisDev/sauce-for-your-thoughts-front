import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Toggle, { ToggleProps } from "./Toggle";
import {
  casual,
  ITERATION_SIZE,
  fakeStore
} from "../../../../../../utils/testUtils/testUtils";

const fakeToggle = (): ToggleProps => ({
  className: casual.random_element([undefined, casual.string]),
  onClick: jest.fn()
});

const mockToggles = new Array(ITERATION_SIZE).fill(null).map(fakeToggle);

describe("<Toggle />", () => {
  it("renders", () => {
    mockToggles.forEach(mockToggle => {
      const wrapper = enzyme.shallow(
        <Provider store={fakeStore()}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockToggles.forEach(mockToggle => {
      const wrapper = enzyme.mount(
        <Provider store={fakeStore()}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
