import * as React from "react";
import * as enzyme from "enzyme";

import Footer, { IFooterProps } from "./Footer";

import { casual, ITERATION_SIZE } from "../../../utils/testUtils/testUtils";

const fakeFooter = (): IFooterProps => ({
  to: casual.string,
  anchorText: casual.random_element([undefined, casual.string])
});

const mockFooters = new Array(ITERATION_SIZE).fill(null).map(fakeFooter);

describe("<Footer />", () => {
  const _defaultText = "View";

  it("renders", () => {
    const wrapper = enzyme.shallow(<Footer to="" />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Footer to="" />);

    expect(wrapper).toMatchSnapshot();
  });

  it("passes 'to' to Link", () => {
    const wrapper = enzyme.shallow(<Footer to="" />);

    expect(wrapper.find("Link").prop("href")).toEqual("");
  });
});
