import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import SauceRelated, { ISauceRelatedProps } from "./SauceRelated";
import {
  fakeSauce,
  ITERATION_SIZE,
  casual
} from "../../../../utils/testUtils/testUtils";
import { IuseSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import { ISauce } from "../../../../redux/sauces/types";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";
import { ListProps } from "../../../List/List";
import { ShallowWrapper } from "enzyme";

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
  let wrappers: ShallowWrapper<
    any,
    React.Component["state"],
    React.Component
  >[] = [];
  const fakeSauceRelatedProps: ISauceRelatedProps[] = [];

  beforeAll(() => {
    // add our mock stores

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      fakeSauceRelatedProps.push({
        sauce: fakeSauce(),
        error: { isVisible: casual.boolean, text: casual.string },
        loading: casual.boolean
      });
      return enzyme.shallow(<SauceRelated {...fakeSauceRelatedProps[ind]} />);
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

  it("renders loading text when loading", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const { loading } = fakeSauceRelatedProps[ind];

      if (!loading) return;

      expect(wrapper.text()).toEqual(_loadingTxt);
    });
  });

  it("renders no related sauces found text when sauce is empty", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const { sauce, loading, error } = fakeSauceRelatedProps[ind];

      if (loading) return;
      if (error.isVisible) return;
      if (sauce) return;

      expect(wrapper.text()).toEqual(_noRelatedSaucesTxt);
    });
  });

  it("renders no related sauces found text when no related sauces are found", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const { sauce, loading, error } = fakeSauceRelatedProps[ind];

      if (loading) return;
      if (error.isVisible) return;
      if (!sauce) return;
      if (sauce._related) return;

      expect(wrapper.text()).toEqual(_noRelatedSaucesTxt);
    });
  });

  it("renders error text when there is an error", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const {  loading, error } = fakeSauceRelatedProps[ind];

      if (loading) return;
      if (!error.isVisible) return;

      expect(wrapper.text()).toEqual(error.text);
    });
  });

  it("renders a List component when related sauces are found and not loading", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const { sauce, loading, error } = fakeSauceRelatedProps[ind];

      if (loading) return;
      if (error.isVisible) return;
      if (!sauce) return;
      if (!sauce._related) return;

      expect(wrapper.find("List").exists()).toBeTruthy();
    });
  });

  it("passes expected params to List component", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab props
      const { sauce, loading, error } = fakeSauceRelatedProps[ind];

      if (loading) return;
      if (error.isVisible) return;
      if (!sauce) return;
      if (!sauce._related) return;

      const list = wrapper.find("List").props() as ListProps;
      expect(list.items.length).toEqual(sauce._related.length);
      expect(list.title).toEqual(_title);
    });
  });
});
