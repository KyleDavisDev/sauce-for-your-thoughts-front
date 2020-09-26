import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import Descriptor, { DescriptorProps } from "./Descriptor";

const fakeDescriptor = (): DescriptorProps => ({
  className: casual.random_element([undefined, casual.string]),
  children: casual.string,
  title: casual.string
});

const mockDescriptors = new Array(ITERATION_SIZE)
  .fill(null)
  .map(fakeDescriptor);

describe("<Descriptor>", () => {
  it("renders", () => {
    mockDescriptors.forEach(mockDescriptor => {
      const wrapper = enzyme.shallow(<Descriptor {...mockDescriptor} />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockDescriptors.forEach(mockDescriptor => {
      const wrapper = enzyme.shallow(<Descriptor {...mockDescriptor} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders expected title", () => {
    mockDescriptors.forEach(mockDescriptor => {
      const wrapper = enzyme.shallow(<Descriptor {...mockDescriptor} />);

      expect(wrapper.find("h2").text()).toEqual(mockDescriptor.title);
    });
  });

  it("renders expected description", () => {
    mockDescriptors.forEach(mockDescriptor => {
      const wrapper = enzyme.shallow(<Descriptor {...mockDescriptor} />);

      expect(wrapper.find("p").text()).toEqual(mockDescriptor.children);
    });
  });

  it("adds className to parent", () => {
    mockDescriptors.forEach(mockDescriptor => {
      if (!mockDescriptor.className) return;

      const wrapper = enzyme.shallow(<Descriptor {...mockDescriptor} />);

      expect(wrapper.find("div").prop("className")).toContain(
        mockDescriptor.className
      );
    });
  });
});
