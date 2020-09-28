import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import CheckBox, { CheckBoxProps } from "./CheckBox";

const fakeCheckBox = (): CheckBoxProps => ({
  checked: casual.boolean,
  id: casual.uuid,
  value: casual.string,
  label: casual.string,
  onClick: jest.fn(),
  className: casual.random_element([undefined, casual.string])
});

const mockCheckBoxes = new Array(ITERATION_SIZE).fill(null).map(fakeCheckBox);

describe("<CheckBox />", () => {
  it("renders", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      if (!mockCheckBox.className) return;

      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.first().prop("className")).toContain(
        mockCheckBox.className
      );
    });
  });

  it("renders an input with type checkbox", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("input").props().type).toEqual("checkbox");
    });
  });

  it("renders an input with expected id attribute", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("input").prop("id")).toEqual(mockCheckBox.id);
    });
  });

  it("renders an input with expected checked attribute", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("input").prop("checked")).toEqual(
        mockCheckBox.checked
      );
    });
  });

  it("renders an input with expected value attribute", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("input").prop("value")).toEqual(mockCheckBox.value);
    });
  });

  it("renders a label element", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("label")).toBeTruthy();
    });
  });

  it("renders a label with expected htmlFor attribute", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("Label").prop("htmlFor")).toEqual(mockCheckBox.id);
    });
  });

  it("renders a label and input pair", () => {
    mockCheckBoxes.forEach(mockCheckBox => {
      const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

      expect(wrapper.find("Label").prop("htmlFor")).toEqual(
        wrapper.find("input").prop("id")
      );
    });
  });
});
