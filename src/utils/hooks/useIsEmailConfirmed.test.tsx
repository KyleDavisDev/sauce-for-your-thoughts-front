import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import { AppState } from "../../redux/configureStore";
import {
  useIsEmailConfirmed,
  IuseIsEmailConfirmed
} from "../../utils/hooks/useIsEmailConfirmed";
import {
  casual,
  fakeStore,
  generateErr,
  ITERATION_SIZE
} from "../testUtils/testUtils";

// mock our API
const mockAPICall = jest.fn(() => {
  if (casual.boolean) {
    return Promise.resolve({ data: { isGood: true } });
  } else {
    const err = generateErr();
    return Promise.reject(err);
  }
});
jest.mock("../../utils/api/API", () => {
  return {
    API: {
      user: {
        isEmailConfirmed: () => {
          return mockAPICall();
        }
      }
    }
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

const HookWrapper = props => {
  const hook = props["data-hook"] ? props["data-hook"]() : undefined;
  return <div data-hook={hook} />;
};

describe("useIsEmailConfirmed", () => {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultIsEmailConfirmed = false;
  const _defaultFlashState = { isVisible: false };

  // May need to refer to these later so initializing out here
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);
  });

  it("renders", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      await act(async () => {
        const wrapper = enzyme.mount(
          <Provider store={mockStores[i]}>
            <HookWrapper data-hook={() => useIsEmailConfirmed()} />
          </Provider>
        );

        expect(wrapper.exists()).toBeTruthy();
      });
    }
  });

  it("returns default loading when no token found", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) return; // skip since we only care about non-token stores

      await act(async () => {
        const wrapper = enzyme.mount(
          <Provider store={mockStores[i]}>
            <HookWrapper data-hook={() => useIsEmailConfirmed()} />
          </Provider>
        );

        const hook: IuseIsEmailConfirmed = wrapper
          .find("div")
          .prop("data-hook");

        expect(hook.loading).toEqual(_defaultIsLoading);
      });
    }
  });

  it("returns default isEmailConfirmed when no token found", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) return; // skip since we only care about non-token stores

      await act(async () => {
        const wrapper = enzyme.mount(
          <Provider store={mockStores[i]}>
            <HookWrapper data-hook={() => useIsEmailConfirmed()} />
          </Provider>
        );

        const hook: IuseIsEmailConfirmed = wrapper
          .find("div")
          .prop("data-hook");

        expect(hook.isEmailConfirmed).toEqual(_defaultIsEmailConfirmed);
      });
    }
  });

  it("returns default error when no token found", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) return; // skip since we only care about non-token stores

      await act(async () => {
        const wrapper = enzyme.mount(
          <Provider store={mockStores[i]}>
            <HookWrapper data-hook={() => useIsEmailConfirmed()} />
          </Provider>
        );

        const hook: IuseIsEmailConfirmed = wrapper
          .find("div")
          .prop("data-hook");

        expect(hook.error).toEqual(_defaultFlashState);
      });
    }
  });

  it("calls API when there is a token", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (!token) return; // skip since we only care about non-token stores

      // reset mock
      mockAPICall.mockClear();

      await act(async () => {
        enzyme.mount(
          <Provider store={mockStores[i]}>
            <HookWrapper data-hook={() => useIsEmailConfirmed()} />
          </Provider>
        );
      });

      // check if was called
      expect(mockAPICall).toHaveBeenCalledTimes(1);
    }
  });
});
