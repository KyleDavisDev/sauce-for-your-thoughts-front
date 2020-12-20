import "jsdom-global/register";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { AppState } from "../../../redux/configureStore";
import { IuseSauceBySlug, useSauceBySlug } from "./useSauceBySlug";
import {
  casual,
  fakeStore,
  ITERATION_SIZE,
  mountReactHookWithReduxStore,
  wait,
  generateErr
} from "../../testUtils/testUtils";

// mock our action payload
const mockSuccessPayload = { type: "SAUCES_ADDED" };
let payload = () => {
  return mockSuccessPayload;
};
jest.mock("../../../redux/sauces/actions", () => {
  return {
    getSauceBySlug: () => payload()
  };
});

// mock router
const DEFAULT_QUERY = { s: "123" };
const useRouterReturn = { asPath: "", query: DEFAULT_QUERY };
jest.mock("next/router", () => {
  return {
    useRouter: () => {
      return useRouterReturn;
    }
  };
});

describe("useSauceBySlug hook", () => {
  // defaults from function
  const _defaultIsLoading = false;
  const _defaultSauce = undefined;
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Could not find a sauce corresponding to this page. Please refresh and try again.";

  // May need to refer to these later so initializing out here
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);
  });

  afterEach(() => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // reset store actions
      mockStores[i].clearActions();

      // reset router
      useRouterReturn.query = DEFAULT_QUERY;

      // reset redux payload
      payload = () => {
        return mockSuccessPayload;
      };
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      expect(wrapper.componentMount.exists()).toBeTruthy();
    }
  });

  it("returns defaults when first called and sauce isn't found", async () => {
    // Set invalid slug so we wont find anything
    useRouterReturn.query = DEFAULT_QUERY;

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const slug = useRouterReturn.query.s;
      const reduxStore = mockStores[i].getState() as AppState;
      if (!reduxStore.sauces.bySlug || !reduxStore.sauces.bySlug[slug])
        continue; // Keep going

      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      const hook = wrapper.componentHook as IuseSauceBySlug;

      expect(hook.loading).toEqual(_defaultIsLoading);
      expect(hook.sauce).toEqual(_defaultSauce);
      expect(hook.error).toEqual(_defaultFlashState);
    }
  });

  it("returns function which, when called, dispatches a redux action if sauce is not already found", async () => {
    // Set invalid slug so we wont find anything
    useRouterReturn.query = DEFAULT_QUERY;

    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const slug = useRouterReturn.query.s;
      const reduxStore = mockStores[i].getState() as AppState;
      if (!reduxStore.sauces.bySlug || !reduxStore.sauces.bySlug[slug])
        continue; // Keep going

      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      // make sure empty list before
      const actionsBefore = mockStores[i].getActions();
      expect(actionsBefore).toEqual([]);

      // perform changes within our component
      const hook = wrapper.componentHook as IuseSauceBySlug;
      await act(async () => {
        await hook.getTheSauce();
      });

      // wait for things
      await wait();

      // Make sure action was emitted
      const actionsAfter = mockStores[i].getActions();
      expect(actionsAfter).toEqual([mockSuccessPayload]);
    }
  });

  it("prevents action dispatches if sauce is already found", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // Grab redux store
      const reduxStore = mockStores[i].getState() as AppState;

      // Set as a slug we know of
      useRouterReturn.query = {
        s: casual.random_element(reduxStore.sauces.allSlugs)
      };

      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      // make sure empty list before
      const actionsBefore = mockStores[i].getActions();
      expect(actionsBefore).toEqual([]);

      // perform changes within our component
      const hook = wrapper.componentHook as IuseSauceBySlug;
      await act(async () => {
        await hook.getTheSauce();
      });

      // wait for things
      await wait();

      // Make sure there wasn't an action emitted
      const actionsAfter = mockStores[i].getActions();
      expect(actionsAfter).toEqual([]);
    }
  });

  it("returns sauce from redux if possible", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxStore = mockStores[i].getState() as AppState;
      if (
        !reduxStore.sauces.bySlug ||
        Object.keys(reduxStore.sauces.bySlug).length === 0
      )
        continue;

      // Set as a slug we know of
      const slug = casual.random_element(reduxStore.sauces.allSlugs);
      useRouterReturn.query = {
        s: slug
      };

      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      // perform changes within our component
      const hook = wrapper.componentHook as IuseSauceBySlug;
      await act(async () => {
        await hook.getTheSauce();
      });

      // wait for things
      await wait();

      // Make sure that the sauce made it over.
      // Hook will have sauce obj in it
      expect(hook.sauce).toEqual(reduxStore.sauces.bySlug[slug]);
    }
  });

  it("returns error if there was one", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      // Define the redux payload differently for this specific test
      const err = generateErr();
      payload = () => {
        throw err;
      };

      // mount component
      const wrapper = mountReactHookWithReduxStore(
        useSauceBySlug,
        mockStores[i]
      );

      // perform changes within our component
      const hook = wrapper.componentHook as IuseSauceBySlug;
      await act(async () => {
        await hook.getTheSauce();
      });

      // wait for things
      await wait();

      // Hook will have error obj in it
      expect(hook.error.type).toEqual("warning");
      expect(hook.error.isVisible).toEqual(true);
      expect(hook.error.text).toEqual(err.response.data.msg);
    }
  });
});
