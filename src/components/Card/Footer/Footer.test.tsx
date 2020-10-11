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
    mockFooters.forEach(mockFooter => {
      const wrapper = enzyme.shallow(<Footer {...mockFooter} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockFooters.forEach(mockFooter => {
      const wrapper = enzyme.shallow(<Footer {...mockFooter} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("passes 'to' to Link", () => {
    mockFooters.forEach(mockFooter => {
      const wrapper = enzyme.shallow(<Footer {...mockFooter} />);

      expect(wrapper.find("Link").prop("href")).toEqual(mockFooter.to);
    });
  });

  it("passes expected anchorText to Button ", () => {
    mockFooters.forEach(mockFooter => {
      if (!mockFooter.anchorText) return;

      const wrapper = enzyme.shallow(<Footer {...mockFooter} />);

      expect(wrapper.find("Button").prop("children")).toEqual(
        mockFooter.anchorText
      );
    });
  });

  it("passes a defualt anchorText value if none provided to Button", () => {
    mockFooters.forEach(mockFooter => {
      if (mockFooter.anchorText) return;

      const wrapper = enzyme.shallow(<Footer {...mockFooter} />);

      expect(wrapper.find("Button").prop("children")).toEqual(_defaultText);
    });
  });
});
