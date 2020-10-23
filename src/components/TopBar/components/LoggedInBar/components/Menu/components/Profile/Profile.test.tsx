import * as React from "react";
import * as enzyme from "enzyme";

import Profile from "./Profile";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../../../utils/testUtils/testUtils";
import { Provider } from "react-redux";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Profile />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.shallow(
        <Provider store={mockStore}>
          <Profile />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });
});
