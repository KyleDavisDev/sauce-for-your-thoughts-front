import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { fakeStore, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import { MockStoreEnhanced } from "redux-mock-store";
import { AppState } from "../../redux/configureStore";

describe("<Navigation />", () => {
  // defaults from component
  const _sauceRedirect = "/account/login?return=/sauce/add";
  const _sauceAdd = "/sauce/add";

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

  it("renders a several li elements", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("ul li").length).toBeGreaterThan(0);
    });
  });

  it("renders a redirect link if user not logged in", () => {
    wrappers.forEach((wrapper, ind) => {
      // check if person is logged in
      const reduxStore = mockStores[ind].getState() as AppState;
      const token = reduxStore.users.self?.token;
      if (token) return;

      expect(
        wrapper.find(`Link[href='${_sauceRedirect}']`).exists()
      ).toBeTruthy();
    });
  });
});
