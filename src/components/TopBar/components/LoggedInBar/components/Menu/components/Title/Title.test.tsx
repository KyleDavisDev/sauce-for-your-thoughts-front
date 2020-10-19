import * as React from "react";
import * as enzyme from "enzyme";

import Title, { TitleProps } from "./Title";
import {
  casual,
  ITERATION_SIZE
} from "../../../../../../../../utils/testUtils/testUtils";

const fakeTitle = (): TitleProps => ({
  children: casual.string,
  className: casual.random_element([undefined, casual.string])
});

const mockTitles = new Array(ITERATION_SIZE).fill(null).map(fakeTitle);

describe("<Title />", () => {
  it("renders", () => {
    mockTitles.forEach(mockTitle => {
      const wrapper = enzyme.shallow(
        <Title {...mockTitle}>{mockTitle.children}</Title>
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockTitles.forEach(mockTitle => {
      const wrapper = enzyme.shallow(
        <Title {...mockTitle}>{mockTitle.children}</Title>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("appends className to parent", () => {
    mockTitles.forEach(mockTitle => {
      const wrapper = enzyme.shallow(
        <Title {...mockTitle}>{mockTitle.children}</Title>
      );

      expect(wrapper.first().prop("className")).toEqual(mockTitle.className);
    });
  });
});
