import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

import UserSettings from "./UserSettings";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";
import { MockStoreEnhanced } from "redux-mock-store";

const mockEmailConfirmed = jest.fn();
jest.mock("../../utils/hooks/useIsEmailConfirmed/useIsEmailConfirmed", () => {
  return {
    useIsEmailConfirmed() {
      return {
        loading: false,
        isEmailConfirmed: true,
        error: {},
        getEmailConfirmed: mockEmailConfirmed
      };
    }
  };
});
window.moveTo = jest.fn();

describe("<UserSettings />", () => {
  // May need to refer to these later so initializing out here
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
          <UserSettings />
        </Provider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
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

  it("calls hook API method on load", () => {
    mockStores.forEach(mockStore => {
      mockEmailConfirmed.mockClear();

      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <UserSettings />
        </Provider>
      );

      expect(mockEmailConfirmed).toHaveBeenCalledTimes(1);
    });
  });

  it("renders four ButtonRedirect components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("ButtonRedirect").length).toEqual(4);
    });
  });
});
