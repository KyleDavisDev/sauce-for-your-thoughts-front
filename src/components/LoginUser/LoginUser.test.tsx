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
import { min } from "moment";

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
  const MIN_PASSWORD_LENGTH = 8;
  const _pageTitle = "Login";
  const _submitButtonText = "Login";
  const _registerLink = { href: "/account/register", text: "Sign up!" };
  const _forgotPasswordLink = {
    href: "/account/reset/password",
    text: "Forgot your password?"
  };
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

  afterEach(async () => {
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];

      // clear all inputs
      wrapper.find("TextInput input").forEach(input => {
        input.simulate("change", { target: { value: "" } });
      });

      // Make sure flashmessage is closed
      const button = wrapper.find("FlashMessage Button button");
      if (!button.exists()) continue;

      // close flashmessage
      button.simulate("click");

      // give pause for any rerenderings
      await wait();
    }
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

  it("renders a password reset Link component with expected values", () => {
    wrappers.forEach(wrapper => {
      const link = wrapper.find("form Link").first();

      expect(link.exists).toBeTruthy();
      expect(link.prop("href")).toEqual(_forgotPasswordLink.href);
      expect(link.text()).toEqual(_forgotPasswordLink.text);
    });
  });

  it("renders an account registration Link component with expected values", () => {
    wrappers.forEach(wrapper => {
      const link = wrapper.find("form Link").last();

      expect(link.exists).toBeTruthy();
      expect(link.prop("href")).toEqual(_registerLink.href);
      expect(link.text()).toEqual(_registerLink.text);
    });
  });

  it("renders FlashMessage component on submission if email field is not an email", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];

      // add email
      const _email = casual.string;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );

      // make sure component isn't found OR doesn't have children
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper
        .find("form button[type='submit']")
        .first()
        .simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible (has children)
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if email field is legit but password is too short", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 0, len = wrappers.length; i < len; i++) {
      const wrapper = wrappers[i];

      // add email
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );

      // add short password
      const _pw = generateInValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );

      // make sure component isn't found OR doesn't have children
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper
        .find("form button[type='submit']")
        .first()
        .simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible (has children)
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });
});
