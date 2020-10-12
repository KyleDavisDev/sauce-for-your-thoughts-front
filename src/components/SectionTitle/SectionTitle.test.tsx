import * as React from "react";
import * as enzyme from "enzyme";

import SectionTitle, { SectionTitleProps } from "./SectionTitle";
import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

const fakeSectionTitle = (): SectionTitleProps => ({
  title: casual.string,
  description: casual.string
});

const mockSectionTitles = new Array(ITERATION_SIZE)
  .fill(null)
  .map(fakeSectionTitle);

describe("<SectionTitle />", () => {
  it("renders", () => {
    mockSectionTitles.forEach(mockSectionTitle => {
      const wrapper = enzyme.shallow(<SectionTitle {...mockSectionTitle} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockSectionTitles.forEach(mockSectionTitle => {
      const wrapper = enzyme.shallow(<SectionTitle {...mockSectionTitle} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders single h2 and single h6 tags", () => {
    mockSectionTitles.forEach(mockSectionTitle => {
      const wrapper = enzyme.shallow(<SectionTitle {...mockSectionTitle} />);

      expect(wrapper.find("h2").exists()).toBeTruthy();
      expect(wrapper.find("h2").length).toEqual(1);

      expect(wrapper.find("h6").exists()).toBeTruthy();
      expect(wrapper.find("h6").length).toEqual(1);
    });
  });

  it("renders expected title", () => {
    mockSectionTitles.forEach(mockSectionTitle => {
      const wrapper = enzyme.shallow(<SectionTitle {...mockSectionTitle} />);

      expect(wrapper.find("h2").render().text()).toEqual(
        mockSectionTitle.title
      );
    });
  });

  it("renders expected description", () => {
    mockSectionTitles.forEach(mockSectionTitle => {
      const wrapper = enzyme.shallow(<SectionTitle {...mockSectionTitle} />);

      expect(wrapper.find("h6").render().text()).toEqual(
        mockSectionTitle.description
      );
    });
  });
});
