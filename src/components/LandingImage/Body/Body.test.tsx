import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Body from "./Body";
import { ITERATION_SIZE, fakeStore } from "../../../utils/testUtils/testUtils";
import { MockStoreEnhanced } from "redux-mock-store";
import { AppState } from "../../../redux/configureStore";

// mock next's router
const mockPush = jest.fn();
jest.mock("next/router", () => {
  return {
    useRouter: () => {
      return {
        push: mockPush
      };
    }
  };
});

describe("<Body />", () => {
  // component constants
  const _defaultTitleText = "Find your perfect sauce";

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

  it("renders an h1 element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("h1").exists()).toBeTruthy();
    });
  });

  it("renders expected title inside h1 element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("h1").first().text()).toEqual(_defaultTitleText);
    });
  });

  it("renders a form element", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form").exists()).toBeTruthy();
    });
  });

  it("renders a Select component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Select").exists()).toBeTruthy();
    });
  });

  it("renders a Select component with expected id", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Select").first().prop("id")).toEqual("types");
    });
  });

  it("renders a Select component with expected options", () => {
    wrappers.forEach((wrapper, ind) => {
      // get types from redux
      const reduxState = mockStores[ind].getState() as AppState;
      const reduxTypes = reduxState.sauces.types;

      // compare redux types to component options
      expect(wrapper.find("Select").first().prop("options")).toEqual(
        reduxTypes
      );
    });
  });

  it("renders a TextInput component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").exists()).toBeTruthy();
    });
  });

  it("renders a TextInput component with expected id", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("TextInput").first().prop("id")).toEqual("search");
    });
  });

  it("renders a submit button", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("form button[type='submit']").exists()).toBeTruthy();
    });
  });

  it("calls router on submit", () => {
    wrappers.forEach(wrapper => {
      // submit form
      const btn = wrapper.find("form button[type='submit']");

      // clear mocks
      mockPush.mockClear();

      // simulate submission
      btn.simulate("submit");

      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });
});
