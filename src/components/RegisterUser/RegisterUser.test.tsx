import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import RegisterUser from "./RegisterUser";
import {
  casual,
  ITERATION_SIZE,
  fakeStore,
  simulateInputChange,
  wait,
  generateValidPassword,
  generateInValidPassword
} from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";
import { act } from "react-dom/test-utils";

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

  afterEach(async () => {
    for (let i = 30, len = wrappers.length; i < len; i++) {
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

  it("passes the expected page title to the PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").text()).toEqual(_pageTitle);
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
      expect(component.prop("href")).toEqual("/tac");
    });
  });

  it("renders FlashMessage component on submission if email fields do not match", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 30, len = wrappers.length; i < len; i++) {
      // add email and slighty different email
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email + "1"
      );

      // make sure component isn't found OR doesn't have children
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible (has children)
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if password fields do not match", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 30, len = wrappers.length; i < len; i++) {
      // add same email to email fields
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );

      // add password and slightly different password
      const _pw = generateValidPassword();
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw + "1"
      );

      // make no flashmessage visible
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });

  it("renders FlashMessage component on submission if password fields are too short", async () => {
    // Need to use this method allow for promises not to error us out
    for (let i = 30, len = wrappers.length; i < len; i++) {
      // add same email to email fields
      const wrapper = wrappers[i];
      const _email = casual.email;
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        _email
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmEmail']").first(),
        "confirmEmail",
        _email
      );

      // add password and slightly different password
      const _pw = generateInValidPassword();
      simulateInputChange(
        wrapper.find("TextInput input[name='password']").first(),
        "password",
        _pw
      );
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmPassword']").first(),
        "confirmPassword",
        _pw
      );

      // make no flashmessage visible
      let flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toEqual(0);

      // simulate form submission
      await wrapper.find("StyledButton").first().simulate("submit");

      // wait for rerender
      await wait();

      // check if FlashMessage is now visible
      flashMessage = wrappers[i].find("FlashMessage FlashMessage");
      expect(
        flashMessage.exists() ? flashMessage.children().length : 0
      ).toBeGreaterThan(0);
    }
  });
});
