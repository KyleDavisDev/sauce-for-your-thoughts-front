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
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const mockGetFeaturedSauces = jest.fn();
let mockGenerateSauces = () =>
  casual.random_element([
    [],
    new Array(casual.integer(1, 15)).fill(null).map(fakeSauce)
  ]);
jest.mock("../../utils/hooks/useFeaturedSauces/useFeaturedSauces", () => {
  return {
    useFeaturedSauces() {
      return {
        loading: false,
        sauces: mockGenerateSauces(),
        error: {},
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
          <FeaturedSauces />
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

  it("renders a SectionTitle component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("SectionTitle").exists()).toBeTruthy();
    });
  });
});
