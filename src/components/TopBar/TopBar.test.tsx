import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import TopBar from "./TopBar";
import { fakeStore, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

describe("<TopBar />", () => {
  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.render(
        <Provider store={fakeStore()}>
          <TopBar />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.mount(
        <Provider store={fakeStore()}>
          <TopBar />
        </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
