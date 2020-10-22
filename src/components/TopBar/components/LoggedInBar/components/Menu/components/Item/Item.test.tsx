import * as React from "react";
import * as enzyme from "enzyme";

import Item, { ItemProps } from "./Item";
import {
  casual,
  ITERATION_SIZE
} from "../../../../../../../../utils/testUtils/testUtils";

const fakeItem = (): ItemProps => ({
  to: casual.random_element([undefined, casual.url]),
  children: casual.string,
  onClick: casual.random_element([undefined, jest.fn()])
});

const mockItems = new Array(ITERATION_SIZE).fill(null).map(fakeItem);

describe("<Item />", () => {
  const _defaultPath = "#";

  it("renders", () => {
    mockItems.forEach(mockItem => {
      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockItems.forEach(mockItem => {
      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Link component", () => {
    mockItems.forEach(mockItem => {
      if (!mockItem.to) return;

      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper.find("Link").exists()).toBeTruthy();
    });
  });

  it("passes expected 'to' to Link component when provided", () => {
    mockItems.forEach(mockItem => {
      if (!mockItem.to) return;

      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper.find("Link").prop("href")).toEqual(mockItem.to);
    });
  });

  it("passes default 'to' to Link component when not provided", () => {
    mockItems.forEach(mockItem => {
      if (mockItem.to) return;

      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper.find("Link").prop("href")).toEqual(_defaultPath);
    });
  });

  it("passes expected children to Link component", () => {
    mockItems.forEach(mockItem => {
      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper.find("Link").prop("children")).toEqual(mockItem.children);
    });
  });

  it("passes expected 'onClick' to parent when provided", () => {
    mockItems.forEach(mockItem => {
      if (!mockItem.onClick) return;

      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper.first().prop("onClick")).toEqual(mockItem.onClick);
    });
  });
});
