import * as React from "react";
import * as enzyme from "enzyme";

import TextInput, { TextInputProps } from "./TextInput";
import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

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

const mockTextInputs = new Array(ITERATION_SIZE).fill(null).map(fakeTextInput);

describe("<TextInput />", () => {
  it("renders", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent", () => {
    mockTextInputs.forEach(mockTextInput => {
      if (!mockTextInput.className) return;
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      expect(wrapper.first().prop("className")).toContain(
        mockTextInput.className
      );
    });
  });

  it("renders single input element", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      expect(wrapper.find("input")).toBeTruthy();
    });
  });

  it("renders input element with expected type or default", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      if (mockTextInput.type) {
        expect(wrapper.find("input").prop("type")).toEqual(mockTextInput.type);
        return;
      }

      expect(wrapper.find("input").prop("type")).toEqual("text");
    });
  });

  it("renders input element with expected id or default", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      if (mockTextInput.id) {
        expect(wrapper.find("input").prop("id")).toEqual(mockTextInput.id);
        return;
      }

      expect(wrapper.find("input").prop("id")).toBeDefined();
    });
  });

  it("renders input element with expected enable/disable or default", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      if (mockTextInput.disabled) {
        expect(wrapper.find("input").prop("disabled")).toEqual(
          mockTextInput.disabled
        );
        expect(wrapper.find("input").prop("aria-disabled")).toEqual(
          mockTextInput.disabled
        );
        return;
      }

      expect(wrapper.find("input").prop("disabled")).toEqual(false);
      expect(wrapper.find("input").prop("aria-disabled")).toEqual(false);
    });
  });

  it("renders input element with expected required or default", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      if (mockTextInput.required) {
        expect(wrapper.find("input").prop("required")).toEqual(
          mockTextInput.required
        );
        expect(wrapper.find("input").prop("aria-required")).toEqual(
          mockTextInput.required
        );
        return;
      }

      expect(wrapper.find("input").prop("required")).toEqual(false);
      expect(wrapper.find("input").prop("aria-required")).toEqual(false);
    });
  });

  it("renders input element with expected placeholder", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      if (mockTextInput.placeholder) {
        expect(wrapper.find("input").prop("placeholder")).toEqual(
          mockTextInput.placeholder
        );
        return;
      }

      expect(wrapper.find("input").prop("placeholder")).toBeUndefined();
    });
  });

  it("renders input element with expected onChange", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      expect(wrapper.find("input").prop("onChange")).toEqual(
        mockTextInput.onChange
      );
    });
  });

  it("triggers onChange function when input is changed", () => {
    mockTextInputs.forEach(mockTextInput => {
      const wrapper = enzyme.shallow(<TextInput {...mockTextInput} />);

      expect(mockTextInput.onChange).not.toHaveBeenCalled();

      wrapper.find("input").simulate("change");
      expect(mockTextInput.onChange).toHaveBeenCalled();

      wrapper.find("input").simulate("change");
      expect(mockTextInput.onChange).toHaveBeenCalledTimes(2);
    });
  });
});
