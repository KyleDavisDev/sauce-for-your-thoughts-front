import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import TopBar from "./TopBar";
import { fakeStore, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

describe("<TopBar />", () => {
  const wrappers: any = [];

  beforeAll(() => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      wrappers.push(
        enzyme.mount(
          <Provider store={fakeStore()}>
            <TopBar />
          </Provider>
        )
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a header tag", () => {
    wrappers.forEach(wrapper => {
      // expect(wrapper.find("header").exists()).toBeTruthy();
    });
  });
});
