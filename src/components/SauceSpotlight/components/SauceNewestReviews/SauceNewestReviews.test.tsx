import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import { ReactWrapper } from "enzyme";

import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

import SauceNewestReviews from "./SauceNewestReviews";
import { AppState } from "../../../../redux/configureStore";

describe("<SauceNewestReviews />", () => {
  // defaults
  const _noNewSauces = "Could not find any new sauces!";
  const _title = "Newly Reviewed";

  let wrappers: ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >[] = [];
  let fakeStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    fakeStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={fakeStores[ind]}>
          <SauceNewestReviews />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders default empty text if no sauces found", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = fakeStores[ind].getState() as AppState;

      // if we have newest sauces, then we wont render out the default so we can skip
      if (reduxStore.sauces.newest && reduxStore.sauces.newest.length > 0)
        return;

      expect(wrapper.text()).toContain(_noNewSauces);
    });
  });
});
