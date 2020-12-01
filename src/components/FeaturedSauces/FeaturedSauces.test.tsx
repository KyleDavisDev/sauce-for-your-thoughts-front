import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";

import FeaturedSauces from "./FeaturedSauces";
import {
  casual,
  fakeSauce,
  fakeStore,
  generateFakeSauces,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import { IuseFeaturedSauces } from "../../utils/hooks/useFeaturedSauces/useFeaturedSauces";
import { FlashMessageProps } from "../FlashMessage/FlashMessage";

const mockGetFeaturedSauces = jest.fn();
let mockSaucesArr = generateFakeSauces();
const staticSauces = mockSaucesArr;
let mockLoading = false;
let mockError: FlashMessageProps = {
  isVisible: false
};
jest.mock("../../utils/hooks/useFeaturedSauces/useFeaturedSauces", () => {
  return {
    useFeaturedSauces(): IuseFeaturedSauces {
      return {
        loading: mockLoading,
        sauces: mockSaucesArr,
        error: mockError,
        getFeaturedSauces: mockGetFeaturedSauces
      };
    }
  };
});
window.moveTo = jest.fn();

describe("<FeaturedSauces />", () => {
  // constants from component
  const _title = {
    title: "Featured Sauces",
    description:
      "Check out some of these unique sauces. Discover flavors you've never tasted before!"
  };
  const _loadingText = "Loading...";
  const _noSaucesFoundText = "No sauces found...";

  // May need to refer to these later so initializing out here
  let wrappers: Array<enzyme.ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = [];
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];
  let mockClassNames: string[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    mockClassNames = new Array(ITERATION_SIZE)
      .fill(null)
      .map(x => casual.random_element([undefined, casual.string]));

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={mockStores[ind]}>
          <FeaturedSauces className={mockClassNames[ind]} />
        </Provider>
      );
    });
  });

  afterEach(() => {
    // reset back to original values
    mockLoading = false;
    mockError = {
      isVisible: false
    };
    mockSaucesArr = staticSauces;
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

  it("concatinates className onto parent container", () => {
    wrappers.forEach((wrapper, ind) => {
      if (!mockClassNames[ind]) return;

      expect(wrapper.find("div").first().prop("className")).toContain(
        mockClassNames[ind]
      );
    });
  });

  it("renders a SectionTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("SectionTitle").exists()).toBeTruthy();
    });
  });

  it("passes expected values to SectionTitle", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("SectionTitle").props()).toEqual(
        expect.objectContaining(_title)
      );
    });
  });

  it("will display loading text if it is loading", () => {
    // set loading
    mockLoading = true;

    wrappers.forEach(wrapper => {
      // unmount and mount again to rerender
      wrapper.unmount();
      wrapper.mount();

      expect(
        wrapper.find("[data-testid='cardsContainer']").first().text()
      ).toEqual(_loadingText);
    });
  });

  it("will display error text if there is an error", () => {
    wrappers.forEach(wrapper => {
      // set error
      const err = casual.text;
      mockError = {
        isVisible: true,
        text: err
      };

      // unmount and mount again to rerender
      wrapper.unmount();
      wrapper.mount();

      expect(
        wrapper.find("[data-testid='cardsContainer']").first().text()
      ).toEqual(err);
    });
  });

  it("will show appropriate text when no sauces are found", () => {
    // assign empty list
    mockSaucesArr = [];

    wrappers.forEach(wrapper => {
      // unmount and mount again to rerender
      wrapper.unmount();
      wrapper.mount();

      expect(
        wrapper.find("[data-testid='cardsContainer']").first().text()
      ).toEqual(_noSaucesFoundText);
    });
  });
});
