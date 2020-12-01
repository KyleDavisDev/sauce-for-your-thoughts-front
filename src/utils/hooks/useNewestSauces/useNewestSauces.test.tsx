import "jsdom-global/register";
import { MockStoreEnhanced } from "redux-mock-store";
import { act } from "react-dom/test-utils";

import { AppState } from "../../../redux/configureStore";
import { useNewestSauces, IuseFeaturedSauces } from "./useNewestSauces";
import {
  fakeStore,
  ITERATION_SIZE,
  mountReactHookWithReduxStore,
  wait
} from "../../testUtils/testUtils";

// mock our action
const mockLoginPayload = () => ({
  type: "SAUCES_ADDED"
});
jest.mock(".../../../redux/sauces/actions", () => {
  return {
    getSaucesByFeatured: () => {
      return mockLoginPayload();
    }
  };
});
