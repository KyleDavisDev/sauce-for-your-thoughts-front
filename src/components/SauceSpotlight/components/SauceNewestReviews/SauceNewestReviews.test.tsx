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
import { ListItem } from "../../../List/List";

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

      // skip if we have sauces
      const { saucesWithNewestReviews } = reduxStore.sauces;
      if (saucesWithNewestReviews && saucesWithNewestReviews.length > 0) return;

      expect(wrapper.text()).toContain(_noNewSauces);
    });
  });

  it("renders a List component if sauces found", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = fakeStores[ind].getState() as AppState;

      // Make sure we have sauces to render
      const { saucesWithNewestReviews } = reduxStore.sauces;
      if (!saucesWithNewestReviews) return;
      if (saucesWithNewestReviews.length === 0) return;

      expect(wrapper.find("List").exists()).toBeTruthy();
    });
  });

  it("passes expected number of items to List component", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = fakeStores[ind].getState() as AppState;

      // Make sure we have sauces to render
      const { saucesWithNewestReviews } = reduxStore.sauces;
      if (!saucesWithNewestReviews) return;
      if (saucesWithNewestReviews.length === 0) return;

      // Check that the same number of items in redux store are passed to component
      const items = wrapper.find("List").prop("items") as ListItem[];
      expect(items.length).toEqual(saucesWithNewestReviews.length);
    });
  });

  it("passes expected title to List component", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = fakeStores[ind].getState() as AppState;

      // Make sure we have sauces to render
      const { saucesWithNewestReviews } = reduxStore.sauces;
      if (!saucesWithNewestReviews) return;
      if (saucesWithNewestReviews.length === 0) return;

      // Check that the same number of items in redux store are passed to component
      const title = wrapper.find("List").prop("title");
      expect(title).toEqual(_title);
    });
  });
});
