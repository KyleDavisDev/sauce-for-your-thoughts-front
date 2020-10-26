import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import UpdateEmail from "./UpdateEmail";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn()
  }))
}));

describe("<UpdateEmail />", () => {
  const _defaultTitle = "Update Email";
  const wrappers: any = [];

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
});
