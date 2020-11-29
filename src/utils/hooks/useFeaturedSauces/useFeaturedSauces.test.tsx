import "jsdom-global/register";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { AppState } from "../../../redux/configureStore";
import { useFeaturedSauces, IuseFeaturedSauces } from "./useFeaturedSauces";
import {
  casual,
  fakeStore,
  generateErr,
  ITERATION_SIZE,
  mountReactHookWithReduxStore
} from "../../testUtils/testUtils";
import { IErrReturn } from "../../Err/Err";

// mock our API
const mockAPISuccess = () => Promise.resolve({ data: { isGood: true } });
const mockAPIFailure = (err: IErrReturn = generateErr()) => Promise.reject(err);
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

describe("useFeaturedSauces hook", () => {
  // defaults from function
  const _defaultIsLoading = false;
  const _defaultSauces = [];
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Error finding the featured sauces. Try refreshing your page.";

  // May need to refer to these later so initializing out here
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useFeaturedSauces,
        mockStores[i]
      );

      expect(wrapper.componentMount.exists()).toBeTruthy();
    }
  });

  it("returns defaults when first called", async () => {
    // mock full api
    mockAPICall = jest.fn(mockAPIFull);

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useFeaturedSauces,
        mockStores[i]
      );

      const hook = wrapper.componentHook as IuseFeaturedSauces;

      expect(hook.loading).toEqual(_defaultIsLoading);
      expect(hook.sauces).toEqual(_defaultSauces);
      expect(hook.error).toEqual(_defaultFlashState);
    }
  });
});
