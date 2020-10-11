import * as React from "react";
import * as enzyme from "enzyme";

import Head, { IHeadProps } from "./Head";
import { casual, ITERATION_SIZE } from "../../../utils/testUtils/testUtils";

const fakeHead = (): IHeadProps => ({
  showLink: casual.random_element([undefined, casual.boolean]),
  to: casual.string,
  imageLink: casual.random_element([undefined, casual.string]),
  description: casual.random_element([undefined, casual.string])
});

const mockHeads = new Array(ITERATION_SIZE).fill(null).map(fakeHead);

describe("<Head />", () => {
  it("renders", () => {
    mockHeads.forEach(mockHead => {
      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockHeads.forEach(mockHead => {
      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("does not render Link component if showLink is false", () => {
    mockHeads.forEach(mockHead => {
      if (mockHead.showLink) return;

      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper.exists("Link")).toBeFalsy();
    });
  });

  it("renders Link component if showLink is true", () => {
    mockHeads.forEach(mockHead => {
      if (!mockHead.showLink) return;

      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper.exists("Link")).toBeTruthy();
    });
  });

  it("passes 'to' to Link component if showLink is true", () => {
    mockHeads.forEach(mockHead => {
      if (!mockHead.showLink) return;

      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper.find("Link").prop("href")).toEqual(mockHead.to);
    });
  });

  it("passes expected imageLink to image", () => {
    mockHeads.forEach(mockHead => {
      const wrapper = enzyme.shallow(<Head {...mockHead} />);

      expect(wrapper.find("img").prop("src")).toEqual(mockHead.imageLink);
    });
  });
});
