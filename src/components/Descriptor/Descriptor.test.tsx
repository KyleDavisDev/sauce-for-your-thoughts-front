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

  // it("Renders correct title", () => {
  //   expect(wrapper.find("Title").children().text()).toEqual(title);

  //   // Test an updated title
  //   wrapper.setProps({ title: "Another title here!!" });
  //   expect(wrapper.find("Title").children().text()).toEqual(
  //     "Another title here!!"
  //   );
  // });

  // it("Renders correct description", () => {
  //   expect(wrapper.render().find("p").text()).toEqual(children);

  //   // Test an updated description
  //   wrapper.setProps({ children: "Second description test" });
  //   expect(wrapper.render().find("p").text()).toEqual(
  //     "Second description test"
  //   );
  // });
});
