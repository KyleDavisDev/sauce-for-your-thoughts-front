import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Body, { IBodyProps } from "./Body";
import {
  ITERATION_SIZE,
  fakeStore,
  casual
} from "../../../utils/testUtils/testUtils";
import { MockStoreEnhanced } from "redux-mock-store";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Body />", () => {
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
          <Body />
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

  it("renders an h1 tag", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("h1").exists()).toBeTruthy();
    });
  });
});
