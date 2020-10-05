// import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import TextArea, { TextAreaProps } from "./TextArea";
import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

const fakeTextArea = (): TextAreaProps => ({
  id: casual.random_element([undefined, casual.string]),
  name: casual.random_element([undefined, casual.string]),
  placeholder: casual.random_element([undefined, casual.string]),
  required: casual.random_element([undefined, casual.boolean]),
  label: casual.random_element([undefined, casual.string]),
  showLabel: casual.random_element([undefined, casual.boolean]),
  value: casual.random_element([undefined, casual.string, casual.integer]),
  className: casual.random_element([undefined, casual.string]),
  disabled: casual.random_element([undefined, casual.boolean]),
  readOnly: casual.random_element([undefined, casual.boolean]),
  maxLength: casual.random_element([undefined, casual.integer(0, 5000)]),
  requirementText: casual.string,
  onChange: jest.fn()
});

const mockTextAreas = new Array(ITERATION_SIZE).fill(null).map(fakeTextArea);

describe("<TextArea />", () => {
  it("renders", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(
        <TextArea onChange={mockTextArea.onChange} />
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent if passed", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (!mockTextArea.className) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.first().prop("className")).toContain(
        mockTextArea.className
      );
    });
  });
});
