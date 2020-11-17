import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

import UserSettings from "./UserSettings";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";
import { MockStoreEnhanced } from "redux-mock-store";

const mockGetEmailConfirmed = jest.fn();
let mockIsEmailConfirmed = true;
jest.mock("../../utils/hooks/useIsEmailConfirmed/useIsEmailConfirmed", () => {
  return {
    useIsEmailConfirmed() {
      return {
        loading: false,
        isEmailConfirmed: mockIsEmailConfirmed,
        error: {},
        getEmailConfirmed: mockGetEmailConfirmed
      };
    }
  };
});
window.moveTo = jest.fn();

describe("<UserSettings />", () => {
  const _emailBtn = { name: "Update Email", href: "/account/update/email" };
  const _displayNameBtn = {
    name: "Update Display Name",
    href: "/account/update/displayname"
  };
  const _avatarBtn = { name: "Update Avatar", href: "/account/update/avatar" };
  const _passwordBtn = {
    name: "Update Password",
    href: "/account/update/password"
  };

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
          <UserSettings />
        </Provider>
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

  it("calls hook API method on load", () => {
    mockStores.forEach(mockStore => {
      mockGetEmailConfirmed.mockClear();

      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <UserSettings />
        </Provider>
      );

      expect(mockGetEmailConfirmed).toHaveBeenCalledTimes(1);
    });
  });

  it("renders four ButtonRedirect components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("ButtonRedirect").length).toEqual(4);
    });
  });

  it("renders a ButtonRedirect component for updating email", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper
          .find(
            `ButtonRedirect[name='${_emailBtn.name}'][href='${_emailBtn.href}']`
          )
          .exists()
      ).toBeTruthy();
    });
  });

  it("renders a ButtonRedirect component for display name", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper
          .find(
            `ButtonRedirect[name='${_displayNameBtn.name}'][href='${_displayNameBtn.href}']`
          )
          .exists()
      ).toBeTruthy();
    });
  });

  it("renders a ButtonRedirect component for avatar", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper
          .find(
            `ButtonRedirect[name='${_avatarBtn.name}'][href='${_avatarBtn.href}']`
          )
          .exists()
      ).toBeTruthy();
    });
  });

  it("renders a ButtonRedirect component for password", () => {
    wrappers.forEach(wrapper => {
      expect(
        wrapper
          .find(
            `ButtonRedirect[name='${_passwordBtn.name}'][href='${_passwordBtn.href}']`
          )
          .exists()
      ).toBeTruthy();
    });
  });

  it("renders RequestConfirmation component when email is not confirmed", () => {
    // make sure is false
    mockIsEmailConfirmed = false;

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const wrapper = enzyme.mount(
        <Provider store={mockStores[i]}>
          <UserSettings />
        </Provider>
      );

      expect(wrapper.find("RequestConfirmation").exists()).toBeTruthy();
    }
  });
});
