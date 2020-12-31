import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { fakeStore, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import { MockStoreEnhanced } from "redux-mock-store";

describe("<Navigation />", () => {
  let wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={mockStores[ind]}>
          <Navigation />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a LogoSFYT component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("LogoSFYT").exists()).toBeTruthy();
    });
  });

  it("renders a Bar component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Bar").exists()).toBeTruthy();
    });
  });

  it("renders a ul element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("ul").exists()).toBeTruthy();
    });
  });

  it("renders a several li elements ", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("ul li").length).toBeGreaterThan(0);
    });
  });
});
