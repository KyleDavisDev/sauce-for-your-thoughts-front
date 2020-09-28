import * as React from "react";
import * as enzyme from "enzyme";

import { TextInput, TextInputProps } from "./TextInput";
import { casual } from "../../utils/testUtils/testUtils";

const fakeTextInput = (): TextInputProps => ({
  id: casual.random_element([undefined, casual.string]),
  name: casual.random_element([undefined, casual.string]),
  placeholder: casual.random_element([undefined, casual.string]),
  required: casual.random_element([undefined, casual.boolean]),
  label: casual.random_element([undefined, casual.string]),
  showLabel: casual.random_element([undefined, casual.boolean]),
  type: casual.random_element([undefined, "text", "password", "email"]),
  value: casual.random_element([casual.string, casual.integer]),
  className: casual.random_element([undefined, casual.string]),
  disabled: casual.random_element([undefined, casual.boolean]),
  requirementText: casual.random_element([undefined, casual.string]),

  onChange: jest.fn()
});

describe("<TextInput />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<TextInput {...fakeTextInput()} />);
    expect(wrapper).toBeTruthy();
  });

  it("defaults to rendering single input", () => {
    const wrapper = enzyme.shallow(<TextInput {...fakeTextInput()} />);

    expect(wrapper.find("input")).toBeTruthy();
  });

  it("adds className to parent", () => {
    const mockTextInput = fakeTextInput();
    if (!mockTextInput.className) return;
    const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

    expect(wrapper.first().prop("className")).toContain(
      mockTextInput.className
    );
  });
});
