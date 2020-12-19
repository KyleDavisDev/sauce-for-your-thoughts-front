import "jsdom-global/register";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { AppState } from "../../../redux/configureStore";
import { useSauceBySlug, IuseSauceBySlug } from "./useSauceBySlug";
import {
  fakeStore,
  ITERATION_SIZE,
  mountReactHookWithReduxStore,
  wait
} from "../../testUtils/testUtils";

// mock our action
const mockGetSaucePayload = () => ({
  type: "SAUCES_ADDED"
});
jest.mock(".../../../redux/sauces/actions", () => {
  return {
    getSauceBySlug: () => {
      return mockGetSaucePayload();
    }
  };
});

// mock router
jest.mock("next/router", () => {
  return {
    useRouter: () => {
      return { asPath: "", query: { s: "123" } };
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
      mockStores[i].clearActions();
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

  it("returns defaults when first called and redux store is empty", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxStore = mockStores[i].getState() as AppState;
      if (reduxStore.sauces.featured) continue; // Keep going

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

  it("returns function which, when called, dispatches a redux action if redux featured sauces is empty", async () => {
    for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
      const reduxStore = mockStores[i].getState() as AppState;
      if (reduxStore.sauces.featured) continue; // Keep going

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
      expect(actionsAfter).toEqual([mockGetSaucePayload()]);
    }
  });
  //
  // it("prevents dispatches action if redux featured sauces already has items", async () => {
  //   for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
  //     const reduxStore = mockStores[i].getState() as AppState;
  //     const featured = reduxStore.sauces.featured;
  //     if (!featured || featured.length === 0) {
  //       continue; // Keep going
  //     }
  //
  //     // mount component
  //     const wrapper = mountReactHookWithReduxStore(
  //       useSauceBySlug,
  //       mockStores[i]
  //     );
  //
  //     // make sure empty list before
  //     const actionsBefore = mockStores[i].getActions();
  //     expect(actionsBefore).toEqual([]);
  //
  //     // perform changes within our component
  //     const hook = wrapper.componentHook as IuseSauceBySlug;
  //     await act(async () => {
  //       hook.getFeaturedSauces();
  //     });
  //
  //     // wait for things
  //     await wait();
  //
  //     // Make sure there wasn't an action emitted
  //     const actionsAfter = mockStores[i].getActions();
  //     expect(actionsAfter).toEqual([]);
  //   }
  // });
  //
  // it("returns featured sauces from redux if possible", async () => {
  //   for (let i = 0, len = ITERATION_SIZE; i < len; i++) {
  //     const reduxStore = mockStores[i].getState() as AppState;
  //     if (!reduxStore.sauces.featured) continue; // Keep going
  //     if (reduxStore.sauces.featured.length === 0) continue; // Keep going
  //
  //     // mount component
  //     const wrapper = mountReactHookWithReduxStore(
  //       useSauceBySlug,
  //       mockStores[i]
  //     );
  //
  //     // perform changes within our component
  //     const hook = wrapper.componentHook as IuseSauceBySlug;
  //     await act(async () => {
  //       hook.getFeaturedSauces();
  //     });
  //
  //     // wait for things
  //     await wait();
  //
  //     // Make sure that each sauce make it over.
  //     // Hook will have entire sauce Obj so we filter by slug only
  //     expect(hook.sauces.map(x => x.slug)).toEqual(reduxStore.sauces.featured);
  //   }
  // });
});
