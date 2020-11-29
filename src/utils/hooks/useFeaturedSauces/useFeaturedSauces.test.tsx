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
  mountReactHookWithReduxStore,
  wait
} from "../../testUtils/testUtils";
import { IErrReturn } from "../../Err/Err";

// mock our action
const mockLoginPayload = () => ({
  type: "USER_LOGGED_IN"
});
jest.mock(".../../../redux/sauces/actions", () => {
  return {
    getSaucesByFeatured: () => {
      return mockLoginPayload();
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

  it("returns function which allows dispatches a redux action", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useFeaturedSauces,
        mockStores[i]
      );

      // make sure empty list before
      const actionsBefore = mockStores[i].getActions();
      expect(actionsBefore).toEqual([]);

      // perform changes within our component
      const hook = wrapper.componentHook as IuseFeaturedSauces;
      await act(async () => {
        hook.getFeaturedSauces();
      });

      // wait for things
      await wait();

      // Make sure action was emitted
      const actionsAfter = mockStores[i].getActions();
      expect(actionsAfter).toEqual([mockLoginPayload()]);
    }
  });
});
