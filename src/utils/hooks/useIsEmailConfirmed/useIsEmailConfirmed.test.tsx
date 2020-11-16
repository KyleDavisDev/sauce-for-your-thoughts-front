import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";
import { AppState } from "../../../redux/configureStore";
import {
  useIsEmailConfirmed,
  IuseIsEmailConfirmed
} from "./useIsEmailConfirmed";
import {
  casual,
  fakeStore,
  generateErr,
  ITERATION_SIZE,
  wait,
  mountReactHookWithReduxStore,
  ImountReactHookWithReduxStore
} from "../../testUtils/testUtils";

// mock our API
const mockAPISuccess = () => Promise.resolve({ data: { isGood: true } });
const mockAPIFailure = () => Promise.reject(generateErr());
const mockAPIFull = () =>
  casual.boolean ? mockAPISuccess() : mockAPIFailure();
let mockAPICall: jest.Mock<any> = jest.fn();
jest.mock("../../../utils/api/API", () => {
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

describe("useIsEmailConfirmed hook", () => {
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

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      expect(wrapper.componentMount.exists()).toBeTruthy();
    }
  });

  it("returns default loading when no token found", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) continue; // skip since we interested in token'd users

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      expect(hook.loading).toEqual(_defaultIsLoading);
    }
  });

  it("returns default isEmailConfirmed when no token found", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) continue; // skip since we interested in non-token'd users

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      expect(hook.isEmailConfirmed).toEqual(_defaultIsEmailConfirmed);
    }
  });

  it("returns default error when no token found", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) continue; // skip since we interested in non-token'd users

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      expect(hook.error).toEqual(_defaultFlashState);
    }
  });

  it("allows for API call when there is a token", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (!token) continue; // skip since we interested in token'd users

      // reset mock
      mockAPICall.mockClear();

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      // grab hook
      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      // perform changes within our component
      await act(async () => {
        hook.getEmailConfirmed();
      });

      // check if API was called
      expect(mockAPICall).toHaveBeenCalledTimes(1);
    }
  });

  it("does not allow for API calls when there is not a token", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (token) continue; // skip since we interested in non-token'd users

      // reset mock
      mockAPICall.mockClear();

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      // grab hook
      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      // perform changes within our component
      await act(async () => {
        hook.getEmailConfirmed();
      });

      // make sure that API was not called
      expect(mockAPICall).toHaveBeenCalledTimes(0);
    }
  });

  it("returns true if API says it is confirmed", async () => {
    // mock success api
    mockAPICall = jest.fn(mockAPISuccess);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxState = mockStores[i].getState() as AppState;
      const token = reduxState.users.self?.token;
      if (!token) continue; // skip since we interested in token'd users

      // mount component
      const wrapper = await mountReactHookWithReduxStore(
        useIsEmailConfirmed,
        mockStores[i]
      );

      // grab hook
      const hook = wrapper.componentHook as IuseIsEmailConfirmed;

      // check if false
      expect(hook.isEmailConfirmed).toEqual(false);

      // perform changes within our component
      await act(async () => {
        hook.getEmailConfirmed();
      });

      // check success
      expect(hook.isEmailConfirmed).toEqual(true);
    }
  });
});
