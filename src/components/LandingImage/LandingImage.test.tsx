import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import LandingImage, { LandingImageProps } from "./LandingImage";
import { ITERATION_SIZE, fakeStore } from "../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<LandingImage />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.shallow(
        <Provider store={mockStore}>
          <LandingImage />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });
});
