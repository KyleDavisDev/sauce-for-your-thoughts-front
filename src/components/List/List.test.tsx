import * as React from "react";
import * as enzyme from "enzyme";
import List, { ListProps } from "./List";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

const mockList = (): ListProps => ({
  className: casual.random_element([undefined, casual.string]),
  title: casual.string,
  items: new Array(casual.integer(0, 25))
    .fill(null)
    .map(() => ({ link: casual.url, text: casual.text, id: casual.uuid }))
});

const mockLists = new Array(ITERATION_SIZE).fill(null).map(mockList);

describe("<List />", () => {
  it("renders", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct title", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper.find("h5").text()).toEqual(mockList.title);
    });
  });

  it("renders correct number of list items", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper.find("li").length).toEqual(mockList.items.length);
    });
  });

  it("renders correct id on list items", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      // Loop through each li and verify id was mapped correctly
      wrapper.find("li").forEach((listItem, ind) => {
        expect(listItem.props().id).toEqual(mockList.items[ind].id);
      });
    });
  });

  it("concatinates className onto parent", () => {
    mockLists.forEach((mockList: ListProps) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper.find("div").prop("className")).toEqual(mockList.className);
    });
  });
});
