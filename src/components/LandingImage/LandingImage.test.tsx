import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import LandingImage, { LandingImageProps } from "./LandingImage";
import {
  ITERATION_SIZE,
  fakeStore,
  casual
} from "../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<LandingImage />", () => {
  // const _defaultTitleText = "Find your perfect sauce";

  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<LandingImage />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const wrapper = enzyme.shallow(<LandingImage />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("appends classname to parent", () => {
    new Array(ITERATION_SIZE).fill(null).forEach(() => {
      const className = casual.string;
      const wrapper = enzyme.shallow(<LandingImage className={className} />);

      expect(wrapper.first().prop("className")).toEqual(className);
    });
  });

  // it("renders a form", () => {
  //   mockStores.forEach(mockStore => {
  //     const wrapper = enzyme.shallow(<LandingImage />);

  //     expect(wrapper.find("form").exists()).toBeTruthy();
  //   });
  // });

  // it("renders a default title text", () => {
  //   mockStores.forEach(mockStore => {
  //     const wrapper = enzyme.shallow(<LandingImage />);

  //     expect(wrapper.find("h1").first().text()).toEqual(_defaultTitleText);
  //   });
  // });
});
