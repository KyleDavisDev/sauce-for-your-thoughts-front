import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

import UpdatePassword from "./UpdatePassword";
import {
  casual,
  fakeStore,
  generateInValidPassword,
  generateValidPassword,
  ITERATION_SIZE,
  simulateInputChange,
  generateErr
} from "../../utils/testUtils/testUtils";
import { AppState } from "../../redux/configureStore";
import { MockStoreEnhanced } from "redux-mock-store";

// mock Next's router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush
    };
  }
}));

// mock our API
const mockAPICall = jest.fn(() => {
  if (casual.boolean) {
    return Promise.resolve({ isGood: true });
  } else {
    return Promise.reject(generateErr());
  }
});
jest.mock("../../utils/api/API", () => {
  return {
    API: {
      user: {
        updatePassword: () => {
          return mockAPICall();
        }
      }
    }
  };
});

describe("<UpdatePassword />", () => {
  const MIN_PASSWORD_LENGTH = 8;
  const _pageTitle = "Update Password";
  const _redirectPath = "/account/login?return=/account/update/password";
  const _defaultErrorMsg =
    "There was a problem updating your password. Please verify network connection and try again.";

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
          <UpdatePassword />
        </Provider>
      );
    });
  });

  afterEach(() => {
    // clear all inputs
    wrappers.forEach(wrapper => {
      wrapper.find("TextInput input").forEach(input => {
        input.simulate("change", { target: { value: "" } });
      });
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

  it("calls 'router' if no token is available and w/ expected path", () => {
    mockStores.forEach((mockStore, ind) => {
      // get info from redux store
      const reduxStore = mockStore.getState() as AppState;
      const token = reduxStore.users.self?.token;
      if (token) return;

      // reset the mock counters
      mockPush.mockReset();

      // mount component
      enzyme.mount(
        <Provider store={mockStore}>
          <UpdatePassword />
        </Provider>
      );

      // check for mockPush to be called
      expect(mockPush).toHaveBeenCalledTimes(1);

      // check for expected path
      expect(mockPush).toHaveBeenCalledWith(_redirectPath);
    });
  });

  it("renders a PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").exists()).toBeTruthy();
    });
  });

  it("passes the expected title to the PageTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("PageTitle").text()).toEqual(_pageTitle);
    });
  });

  it("renders a form tag", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").exists()).toBeTruthy();
    });
  });

  it("renders 3 TextInput components", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").length).toEqual(3);
    });
  });

  it("renders the first TextInput with an id of 'newPassword'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(0).prop("id")).toEqual("newPassword");
    });
  });

  it("renders the first TextInput with the type of 'password'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(0).prop("type")).toEqual("password");
    });
  });

  it("renders the first TextInput that, when onChange'd, updates it's own value", () => {
    wrappers.forEach(wrapper => {
      const _password = generateValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='newPassword']").first(),
        "newPassword",
        _password
      );

      expect(wrapper.find("TextInput").at(0).prop("value")).toEqual(_password);
    });
  });

  it("renders the second TextInput with an id of 'confirmNewPassword'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(1).prop("id")).toEqual(
        "confirmNewPassword"
      );
    });
  });

  it("renders the second TextInput with the type of 'password'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(1).prop("type")).toEqual("password");
    });
  });

  it("renders the second TextInput which is disabled until the first TextInput contains valid password", () => {
    wrappers.forEach(wrapper => {
      // make sure is disabled
      expect(wrapper.find("TextInput").at(1).prop("disabled")).toEqual(true);

      // insert password
      const _password = generateValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='newPassword']").first(),
        "newPassword",
        _password
      );

      // make sure is now enabled
      expect(wrapper.find("TextInput").at(1).prop("disabled")).toEqual(false);
    });
  });

  it("renders the second TextInput that, when onChange'd, updates it's own value", () => {
    wrappers.forEach(wrapper => {
      const _password = generateValidPassword(MIN_PASSWORD_LENGTH);
      simulateInputChange(
        wrapper.find("TextInput input[name='confirmNewPassword']").first(),
        "confirmNewPassword",
        _password
      );

      expect(wrapper.find("TextInput").at(1).prop("value")).toEqual(_password);
    });
  });

  it("renders the third TextInput with an id of 'oldPassword'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(2).prop("id")).toEqual("oldPassword");
    });
  });

  it("renders the third TextInput with the type of 'password'", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").at(2).prop("type")).toEqual("password");
    });
  });
});
