import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import LoginUser from "./LoginUser";

import {
  casual,
  ITERATION_SIZE,
  fakeStore,
  simulateInputChange,
  wait,
  generateValidPassword,
  generateInValidPassword,
  generateErr
} from "../../utils/testUtils/testUtils";
import { IRegisterUser } from "../../redux/users/types";
import { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";
import { TextInputSetup } from "../TextInput/TextInput";
import { _password } from "casual";

// mock Next's router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush
    };
  }
}));

const mockRegisterPayload = () => ({
  type: "USER_LOGGED_IN"
});

jest.mock("../../redux/users/actions", () => ({
  register: ({ credentials }: { credentials: IRegisterUser }) => {
    return mockRegisterPayload();
  }
}));

describe("<LoginUser />", () => {
  // Constants from component
  const _pageTitle = "Login";
  const _submitButtonText = "Login";
  const _emailInput: TextInputSetup = {
    type: "email",
    id: "email",
    showLabel: true,
    label: "Email",
    name: "email",
    required: true
  };
  const _passwordInput: TextInputSetup = {
    type: "password",
    id: "password",
    showLabel: true,
    label: "Password",
    name: "password",
    required: true
  };

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
          <LoginUser />
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

  it("renders a PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").exists()).toBeTruthy();
    });
  });

  it("renders the expected page title", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").text()).toEqual(_pageTitle);
    });
  });

  it("renders a form element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").text()).toBeTruthy();
    });
  });

  it("renders 2 TextInput components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").length).toEqual(2);
    });
  });

  it("renders the first TextInput with email defaults", () => {
    wrappers.forEach(wrapper => {
      const props = wrapper.find("TextInput").at(0).props();

      // Make sure the defaults are inside of the props object
      expect(props).toEqual(expect.objectContaining(_emailInput));
    });
  });

  it("renders the second TextInput with password defaults", () => {
    wrappers.forEach(wrapper => {
      const props = wrapper.find("TextInput").at(1).props();

      // Make sure the defaults are inside of the props object
      expect(props).toEqual(expect.objectContaining(_passwordInput));
    });
  });

  it("renders a submit button", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form button[type='submit']").exists()).toBeTruthy();
    });
  });

  it("renders a submit button with expected text", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form button[type='submit']").text()).toEqual(
        _submitButtonText
      );
    });
  });
});
