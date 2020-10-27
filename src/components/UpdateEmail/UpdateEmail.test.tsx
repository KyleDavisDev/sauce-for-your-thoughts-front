import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import UpdateEmail from "./UpdateEmail";
import {
  casual,
  fakeStore,
  ITERATION_SIZE,
  simulateInputChange
} from "../../utils/testUtils/testUtils";

// mock Next's router
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn()
  }))
}));

describe("<UpdateEmail />", () => {
  const _defaultTitle = "Update Email";
  const wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];

  beforeAll(() => {
    // push our mounted component into array
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      wrappers.push(
        enzyme.mount(
          <Provider store={fakeStore()}>
            <UpdateEmail />
          </Provider>
        )
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
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

  it("passes the default title to the PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").text()).toEqual(_defaultTitle);
    });
  });

  it("renders a form tag", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").exists()).toBeTruthy();
    });
  });

  it("renders 3 TextInput components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").length).toEqual(3);
    });
  });

  it("first TextInput has an id of 'email'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(0).prop("id")).toEqual("email");
    });
  });

  it("first TextInput updates 'email' value on change", () => {
    wrappers.forEach(wrapper => {
      simulateInputChange(
        wrapper.find("TextInput input[name='email']").first(),
        "email",
        "foo"
      );

      expect(wrapper.find("TextInput").at(0).prop("value")).toEqual("foo");
    });
  });

  it("second TextInput has an id of 'confirmEmail'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(1).prop("id")).toEqual(
        "confirmEmail"
      );
    });
  });

  it("third TextInput has an id of 'password'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(2).prop("id")).toEqual("password");
    });
  });
});
