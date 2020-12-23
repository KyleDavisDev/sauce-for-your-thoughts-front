import * as React from "react";
import * as enzyme from "enzyme";

import AuthorBlock from "./AuthorBlock";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";
import { Provider } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";

describe("<AuthorBlock />", () => {
  let wrappers: any = [];
  let mockStores: any = [];

  beforeAll(() => {
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      // grab redux info
      const reduxStore = mockStores[ind];
      const reduxState = reduxStore.getState() as AppState;

      // Grab random review from redux
      const { byReviewID } = reduxState.reviews;
      if (!byReviewID) return;
      if (Object.keys(byReviewID).length === 0) return;
      const review = casual.random_value(byReviewID);

      return enzyme.mount(
        <Provider store={reduxStore}>
          <AuthorBlock review={review} />
        </Provider>
      );
    });
  });

  it("renders", () => {});
});
