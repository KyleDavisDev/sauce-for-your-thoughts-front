import * as React from "react";
import * as enzyme from "enzyme";
import { Provider, useSelector } from "react-redux";

import TypesOfSauces from "./TypesOfSauces";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Types />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.shallow(
        <Provider store={mockStore}>
          <TypesOfSauces />
        </Provider>
      );
      expect(wrapper).toBeTruthy();
    });
  });
});
