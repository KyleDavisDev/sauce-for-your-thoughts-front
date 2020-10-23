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
  const _defaultDisplayName = "Me";
  const _defaultAvatarURL = "";
  let wrappers: any = [];

  mockStores.forEach(mockStore => {
    let tmp = enzyme.mount(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    wrappers.push(tmp);
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

  it("renders an img tag", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("img").exists()).toBeTruthy();
    });
  });

  it("passes expected src to img tag when possible", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab avatarURL from store
      const reduxState = mockStores[ind].getState() as AppState;
      const avatarURL = reduxState.users.self?.avatarURL;
      if (!avatarURL) return;

      // compare component to redux store
      expect(wrapper.find("img").first().prop("src")).toEqual(avatarURL);
    });
  });

  it("passes default src to img tag when needed", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab avatarURL from store
      const reduxState = mockStores[ind].getState() as AppState;
      const avatarURL = reduxState.users.self?.avatarURL;
      if (avatarURL) return;

      // compare component to default
      expect(wrapper.find("img").first().prop("src")).toEqual(
        _defaultAvatarURL
      );
    });
  });

  it("renders h3 tag", () => {
    wrappers.forEach((wrapper, ind) => {
      expect(wrapper.find("h3").exists()).toBeTruthy();
    });
  });

  it("passes expected displayName to h3 tag when possible", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab displayName from store
      const reduxState = mockStores[ind].getState() as AppState;
      const displayName = reduxState.users.self?.displayName;
      if (!displayName) return;

      expect(wrapper.find("h3").text()).toEqual(displayName);
    });
  });

  it("passes default displayName to h3 tag when needed", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab displayName from store
      const reduxState = mockStores[ind].getState() as AppState;
      const displayName = reduxState.users.self?.displayName;
      if (displayName) return;

      expect(wrapper.find("h3").text()).toEqual(_defaultDisplayName);
    });
  });
});
