import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Menu from "./Menu";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

describe("<Menu />", () => {
  let wrappers: any = [];
  // create stores
  const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

  beforeAll(() => {
    // create wrappers
    mockStores.forEach(mockStore => {
      wrappers.push(
        enzyme.mount(
          <Provider store={mockStore}>
            <Menu />
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

  it("renders Profile component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Profile").exists()).toBeTruthy();
    });
  });

  it("renders Account component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Account").exists()).toBeTruthy();
    });
  });
});
