// import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import TextArea, { TextAreaProps } from "./TextArea";
import { casual } from "../../utils/testUtils/testUtils";

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

describe("<TextArea />", () => {
  it("renders", () => {
    const wrapper = enzyme.render(<TextArea onChange={() => {}} />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.render(<TextArea onChange={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});
