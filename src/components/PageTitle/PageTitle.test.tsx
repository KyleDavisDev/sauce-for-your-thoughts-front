import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import PageTitle, { PageTitleProps } from "./PageTitle";

const fakePageTitle = (): PageTitleProps => ({
  children: casual.random_element([undefined, casual.string]),
  className: casual.random_element([undefined, casual.string])
});

const mockPageTitles = new Array(ITERATION_SIZE).fill(null).map(fakePageTitle);

describe("<PageTitle />", () => {
  it("renders", () => {
    mockPageTitles.forEach(mockPageTitle => {
      const wrapper = enzyme.shallow(<PageTitle {...mockPageTitle} />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockPageTitles.forEach(mockPageTitle => {
      const wrapper = enzyme.shallow(<PageTitle {...mockPageTitle} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent", () => {
    mockPageTitles.forEach(mockPageTitle => {
      if (!mockPageTitle.className) return;
      const wrapper = enzyme.shallow(<PageTitle {...mockPageTitle} />);

      expect(wrapper.find("h1").prop("className")).toContain(
        mockPageTitle.className
      );
    });
  });
});
