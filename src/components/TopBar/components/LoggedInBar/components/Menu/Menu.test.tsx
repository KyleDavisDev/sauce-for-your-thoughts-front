import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Menu from "./Menu";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Menu />", () => {
  let wrappers: any = [];

  mockStores.forEach(mockStore => {
    wrappers.push(
      enzyme.mount(
        <Provider store={mockStore}>
          <Menu />
        </Provider>
      )
    );
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });
});
