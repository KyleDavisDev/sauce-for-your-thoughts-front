import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import SauceHero from "./SauceHero";
import {
  casual,
  fakeStore,
  fakeSauce,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";
import { IuseSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import { ISauce } from "../../../../redux/sauces/types";

let mockLoading = () => false;
let mockSauce = (): undefined | ISauce => undefined;
const mockGetTheSauce = jest.fn();
jest.mock("../../../../utils/hooks/useSauceBySlug/useSauceBySlug", () => {
  return {
    useSauceBySlug(): IuseSauceBySlug {
      return {
        loading: mockLoading(),
        sauce: mockSauce(),
        error: { isVisible: false },
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
          <SauceHero />
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
      mockGetTheSauce.mockClear();

      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(mockGetTheSauce).toHaveBeenCalledTimes(1);
    });
  });

  it("renders an image", () => {
    // set no sauce so component will call function
    mockSauce = () => fakeSauce();
    mockLoading = () => false;

    mockStores.forEach(mockStore => {
      // mount component
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <SauceHero />
        </Provider>
      );

      expect(wrapper.find("img").exists()).toBeTruthy();
    });
  });

  it("renders the sauce's title", () => {
    // set no sauce so component will call function
    const sauce = fakeSauce();
    mockSauce = () => sauce;
    mockLoading = () => false;

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
});
