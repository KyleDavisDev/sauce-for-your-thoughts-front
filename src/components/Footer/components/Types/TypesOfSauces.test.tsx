import * as React from "react";
import * as enzyme from "enzyme";
import { Provider, useSelector } from "react-redux";

import TypesOfSauces from "./TypesOfSauces";
import {
  mockStore,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(mockStore);

describe("<Types />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <Provider store={mockStores[0]}>
        <TypesOfSauces />
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
