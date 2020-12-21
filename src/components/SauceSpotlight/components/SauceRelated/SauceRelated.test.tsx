import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import SauceRelated from "./SauceRelated";
import {
  fakeStore,
  fakeSauce,
  ITERATION_SIZE,
  casual
} from "../../../../utils/testUtils/testUtils";
import { IuseSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import { ISauce } from "../../../../redux/sauces/types";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";
import { ListProps } from "../../../List/List";

let mockLoading = false;
let mockSauce: undefined | ISauce = undefined;
let mockError: FlashMessageProps = {
  isVisible: false
};
const mockGetTheSauce = jest.fn();
jest.mock("../../../../utils/hooks/useSauceBySlug/useSauceBySlug", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    useSauceBySlug(): IuseSauceBySlug {
      return {
        loading: mockLoading,
        sauce: mockSauce,
        error: mockError,
        getTheSauce: mockGetTheSauce
      };
    }
  };
});

describe("<SauceRelated />", () => {
  // defaults from component
  const _loadingTxt = "loading...";
  const _noRelatedSaucesTxt = "Could not find any related sauces!";
  const _title = "Related Sauces";

  // May need to refer to these later so initializing out here
  let wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];
  let mockStores: MockStoreEnhanced<unknown, unknown>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={mockStores[ind]}>
          <SauceRelated />
        </Provider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // reset
    mockLoading = false;
    mockSauce = undefined;
    mockError = {
      isVisible: false
    };
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
    // set so we can call api method
    mockSauce = undefined;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      mockGetTheSauce.mockClear();

      // mount up the component
      enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      // Check if the function was ran or not
      expect(mockGetTheSauce).toHaveBeenCalledTimes(1);
    });
  });

  it("renders loading text when loading", () => {
    mockSauce = undefined;
    mockLoading = true;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      expect(wrapper.text()).toEqual(_loadingTxt);
    });
  });

  it("renders no related sauces found text when sauce is empty", () => {
    mockSauce = undefined;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      expect(wrapper.text()).toEqual(_noRelatedSaucesTxt);
    });
  });

  it("renders no related sauces found text when no related sauces are found", () => {
    const sauce = fakeSauce();
    sauce._related = []; // force no related sauces
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      expect(wrapper.text()).toEqual(_noRelatedSaucesTxt);
    });
  });

  it("renders error text when there is an error", () => {
    mockSauce = undefined;
    mockLoading = false;
    mockError = { isVisible: true, text: casual.string };

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      expect(wrapper.text()).toEqual(mockError.text);
    });
  });

  it("renders a List component when related sauces are found and not loading", () => {
    const sauce = fakeSauce();
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      if (!sauce._related || sauce._related.length === 0) return;

      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      console.log(wrapper.debug());
      expect(wrapper.find("List").exists()).toBeTruthy();
    });
  });

  it("passes expected params to List component", () => {
    const sauce = fakeSauce();
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      if (!sauce._related || sauce._related.length === 0) return;

      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceRelated />
        </Provider>
      );

      const list = wrapper.find("List").props() as ListProps;
      expect(list.items.length).toEqual(sauce._related.length);
      expect(list.title).toEqual(_title);
    });
  });
});
