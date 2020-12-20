import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import SauceHero from "./SauceHero";
import {
  fakeStore,
  fakeSauce,
  ITERATION_SIZE,
  casual
} from "../../../../utils/testUtils/testUtils";
import { IuseSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import { ISauce } from "../../../../redux/sauces/types";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";

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
window.moveTo = jest.fn();

describe("<SauceHero />", () => {
  // defaults from component
  const _loadingTxt = "loading...";
  const _noSauceTxt = "Could not find sauce!";
  const _defaultImagePath =
    "https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png";

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
          <SauceHero />
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
          <SauceHero />
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
          <SauceHero />
        </Provider>
      );

      expect(wrapper.text()).toEqual(_loadingTxt);
    });
  });

  it("renders sauce not found text when there is no sauce", () => {
    mockSauce = undefined;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.text()).toEqual(_noSauceTxt);
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
          <SauceHero />
        </Provider>
      );

      expect(wrapper.text()).toEqual(mockError.text);
    });
  });

  it("renders the sauce's image (or default) when sauce is found and not loading", () => {
    const sauce = fakeSauce();
    sauce.photo = casual.url; // force an image
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("img").exists()).toBeTruthy();
      expect(wrapper.find("img").first().prop("src")).toEqual(sauce.photo);
    });
  });

  it("renders the default image when sauce is found but has no image and is not loading", () => {
    const sauce = fakeSauce();
    sauce.photo = undefined; // force default
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("img").exists()).toBeTruthy();
      expect(wrapper.find("img").first().prop("src")).toEqual(
        _defaultImagePath
      );
    });
  });

  it("renders the sauce's title when sauce is found and not loading", () => {
    const sauce = fakeSauce();
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("h2").exists()).toBeTruthy();
      expect(wrapper.find("h2").first().text()).toEqual(sauce.name);
    });
  });

  it("renders the sauce's maker when sauce is found and not loading", () => {
    const sauce = fakeSauce();
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("[data-test-id='maker']").text()).toContain(
        sauce.maker
      );
    });
  });

  it("renders the sauce's ingredients when sauce is found and not loading", () => {
    const sauce = fakeSauce();
    mockSauce = sauce;
    mockLoading = false;

    mockStores.forEach(mockStore => {
      if (!sauce.ingredients) return;

      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("[data-test-id='ingredients']").text()).toContain(
        sauce.ingredients
      );
    });
  });
});
