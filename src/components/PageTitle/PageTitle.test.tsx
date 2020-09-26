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

  // it("renders correct tag", () => {
  //   expect(wrapper.find("StyledH1")).toBeTruthy();
  //   expect(wrapper.find("StyledH1").length).toEqual(1);
  // });

  // it("renders correct text", () => {
  //   expect(wrapper.find("StyledH1").render().text()).toEqual(children[0]);

  //   // update text, and test
  //   wrapper.setProps({ children: children[1] });
  //   expect(wrapper.find("StyledH1").render().text()).toEqual(children[1]);

  //   // update text, and test
  //   wrapper.setProps({ children: children[2] });
  //   expect(wrapper.find("StyledH1").render().text()).toEqual(children[2]);
  // });
});
