import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import LoginUser from "./LoginUser";

import {
  casual,
  ITERATION_SIZE,
  fakeStore,
  simulateInputChange,
  wait,
  generateValidPassword,
  generateInValidPassword,
  generateErr
} from "../../utils/testUtils/testUtils";
import { IRegisterUser } from "../../redux/users/types";
import { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";

// mock Next's router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush
    };
  }
}));

const mockRegisterPayload = () => ({
  type: "USER_LOGGED_IN"
});

jest.mock("../../redux/users/actions", () => ({
  register: ({ credentials }: { credentials: IRegisterUser }) => {
    return mockRegisterPayload();
  }
}));

describe("<LoginUser />", () => {
  // mock scrollTo
  window.scrollTo = jest.fn();

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
          <LoginUser />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });
});
