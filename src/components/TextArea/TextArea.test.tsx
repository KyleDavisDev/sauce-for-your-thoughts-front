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

  it("renders Label component if showLabel and label are truthy", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (!mockTextArea.showLabel || !mockTextArea.label) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("Label").exists()).toBeTruthy();
    });
  });

  it("renders span tag if showLabel, label, and required are truthy", () => {
    mockTextAreas.forEach(mockTextArea => {
      const shouldRenderRequiredText =
        !!mockTextArea.showLabel &&
        !!mockTextArea.label &&
        !!mockTextArea.required;

      if (!shouldRenderRequiredText) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("span").exists()).toBeTruthy();
    });
  });

  it("renders textarea element", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").exists()).toBeTruthy();
    });
  });

  it("renders textarea element with expected id when id passed", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (!mockTextArea.id) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("id")).toEqual(mockTextArea.id);
    });
  });

  it("renders textarea element with generated id if non provided", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (mockTextArea.id) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("id")).toBeTruthy();
    });
  });

  it("renders textarea element with expected name", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("name")).toEqual(mockTextArea.name);
    });
  });

  it("renders textarea element with expected placeholder", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("placeholder")).toEqual(
        mockTextArea.placeholder
      );
    });
  });

  it("renders textarea element with expected value", () => {
    mockTextAreas.forEach(mockTextArea => {
      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("value")).toEqual(
        mockTextArea.value
      );
    });
  });

  it("renders textarea element with expected required value when required is passed", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (mockTextArea.required === undefined) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("required")).toEqual(
        mockTextArea.required
      );
    });
  });

  it("renders textarea element with expected disabled value when disabled is passed", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (mockTextArea.disabled === undefined) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("disabled")).toEqual(
        mockTextArea.disabled
      );
    });
  });

  it("renders textarea element with expected maxlength value", () => {
    mockTextAreas.forEach(mockTextArea => {
      if (mockTextArea.maxLength === undefined) return;

      const wrapper = enzyme.shallow(<TextArea {...mockTextArea} />);

      expect(wrapper.find("textarea").prop("maxLength")).toEqual(
        mockTextArea.maxLength
      );
    });
  });
});
