import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Body, { IBodyProps } from "./Body";
import {
  ITERATION_SIZE,
  fakeStore,
  casual
} from "../../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Body />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <Body />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });
});
