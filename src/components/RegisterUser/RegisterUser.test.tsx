import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import RegisterUser from "./RegisterUser";
import {
  casual,
  ITERATION_SIZE,
  fakeStore
} from "../../utils/testUtils/testUtils";

describe("<RegisterUser />", () => {
  // defaults
  const _pageTitle = "Register";

  // mock scrollTo
  window.scrollTo = jest.fn();

  // May need to refer to these later so initializing out here
  let wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={mockStores[ind]}>
          <RegisterUser />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a form element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").text()).toBeTruthy();
    });
  });

  it("renders 5 TextInput components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").length).toEqual(5);
    });
  });

  it("renders an email TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='email']").exists()).toBeTruthy();
    });
  });

  it("renders a confirmEmail TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper.find("TextInput[id='confirmEmail']").exists()
      ).toBeTruthy();
    });
  });

  it("renders a password TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='password']").exists()).toBeTruthy();
    });
  });

  it("renders a confirmPassword TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper.find("TextInput[id='confirmPassword']").exists()
      ).toBeTruthy();
    });
  });

  it("renders a displayName TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput[id='displayName']").exists()).toBeTruthy();
    });
  });

  it("renders a Link component for Terms and Conditions", () => {
    wrappers.forEach(wrapper => {
      const component = wrapper.find("Link");

      expect(component.exists()).toBeTruthy();
      expect(component.text()).toContain("Terms and Conditions");
    });
  });
});
