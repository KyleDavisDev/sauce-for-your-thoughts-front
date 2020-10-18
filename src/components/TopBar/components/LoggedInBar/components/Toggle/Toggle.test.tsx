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
import { AppState } from "../../../../../../redux/configureStore";

const fakeToggle = (): ToggleProps => ({
  className: casual.random_element([undefined, casual.string]),
  onClick: jest.fn()
});

const mockToggles = new Array(ITERATION_SIZE).fill(null).map(fakeToggle);

describe("<Toggle />", () => {
  const _defaultDisplayName = "N/A";
  const _defaultAvatarURL = "N/A";

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

  it("appends className to parent", () => {
    mockToggles.forEach(mockToggle => {
      const wrapper = enzyme.shallow(
        <Provider store={fakeStore()}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper.find("Toggle").prop("className")).toEqual(
        mockToggle.className
      );
    });
  });

  it("passes onClick to parent", () => {
    mockToggles.forEach(mockToggle => {
      const wrapper = enzyme.shallow(
        <Provider store={fakeStore()}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper.find("Toggle").prop("onClick")).toEqual(
        mockToggle.onClick
      );
    });
  });

  it("renders expected displayName when provided", () => {
    mockToggles.forEach(mockToggle => {
      const store = fakeStore();

      // make sure displayName is provided
      const reduxState = store.getState() as AppState;
      const displayName = reduxState.users?.self?.displayName;
      if (!displayName) return;

      const wrapper = enzyme.mount(
        <Provider store={store}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper.find("button").last().text()).toEqual(displayName);
    });
  });

  it("renders expected default displayName when not provided", () => {
    mockToggles.forEach(mockToggle => {
      const store = fakeStore();

      // make sure displayName is not provided
      const reduxState = store.getState() as AppState;
      const displayName = reduxState.users?.self?.displayName;
      if (displayName) return;

      const wrapper = enzyme.mount(
        <Provider store={store}>
          <Toggle {...mockToggle} />
        </Provider>
      );

      expect(wrapper.find("button").last().text()).toEqual(_defaultDisplayName);
    });
  });
});
