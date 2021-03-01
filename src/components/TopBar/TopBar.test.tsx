import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import TopBar from "./TopBar";
import { fakeStore, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";

describe("<TopBar />", () => {
  const wrappers: any = [];
  const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

  beforeAll(() => {
    mockStores.forEach(mockStore => {
      wrappers.push(
        enzyme.mount(
          <Provider store={mockStore}>
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
      expect(wrapper.find("header").exists()).toBeTruthy();
    });
  });

  it("renders LoggedInBar component when user has a token tag", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = mockStores[ind].getState() as AppState;
      const token = reduxStore.users.self?.token;
      const doesPersonHaveToken: boolean = !!token;

      // If we do not have a token, go to next
      if (!doesPersonHaveToken) return;

      expect(wrapper.find("LoggedInBar").exists()).toBeTruthy();
    });
  });

  it("renders LoggedOutBar component when user has a token tag", () => {
    wrappers.forEach((wrapper, ind) => {
      const reduxStore = mockStores[ind].getState() as AppState;
      const token = reduxStore.users.self?.token;
      const doesPersonHaveToken: boolean = !!token;

      // If we have a token, go to next
      if (doesPersonHaveToken) return;

      expect(wrapper.find("LoggedOutBar").exists()).toBeTruthy();
    });
  });
});
