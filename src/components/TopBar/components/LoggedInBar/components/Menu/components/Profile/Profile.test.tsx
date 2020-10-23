import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import Profile from "./Profile";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../../../utils/testUtils/testUtils";
import { Provider } from "react-redux";
import { AppState } from "../../../../../../../../redux/configureStore";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Profile />", () => {
  const _defaultDisplayName = "N/A";
  const _defaultAvatarURL = "";

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

  it("matches snapshot", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <Profile />
        </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders an img tag", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <Profile />
        </Provider>
      );

      expect(wrapper.find("img").exists()).toBeTruthy();
    });
  });

  it("passes expected src to img tag when possible", () => {
    mockStores.forEach(mockStore => {
      // grab avatarURL from store
      const reduxState = mockStore.getState() as AppState;
      const avatarURL = reduxState.users.self?.avatarURL;
      if (!avatarURL) return;

      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <Profile />
        </Provider>
      );

      // compare component to redux store
      expect(wrapper.find("img").first().prop("src")).toEqual(avatarURL);
    });
  });
});
