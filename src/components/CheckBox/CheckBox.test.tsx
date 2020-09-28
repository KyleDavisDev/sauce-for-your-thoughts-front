import * as React from "react";
import * as enzyme from "enzyme";

import { casual } from "../../utils/testUtils/testUtils";
import CheckBox, { CheckBoxProps } from "./CheckBox";

const fakeCheckBox = (): CheckBoxProps => ({
  checked: casual.boolean,
  id: casual.uuid,
  value: casual.string,
  label: casual.string,
  onClick: jest.fn(),
  className: casual.random_element([undefined, casual.string])
});

describe("<CheckBox />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<CheckBox {...fakeCheckBox()} />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<CheckBox {...fakeCheckBox()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("adds className to parent", () => {
    const mockCheckBox = fakeCheckBox();
    const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

    expect(wrapper.first().prop("className")).toContain(mockCheckBox.className);
  });

  it("renders an input with type checkbox", () => {
    const mockCheckBox = fakeCheckBox();
    const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

    expect(wrapper.find("input").props().type).toEqual("checkbox");
  });

  it("renders an input with expected id attribute", () => {
    const mockCheckBox = fakeCheckBox();
    const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

    expect(wrapper.find("input").prop("id")).toEqual(mockCheckBox.id);
  });

  it("renders a label element", () => {
    const mockCheckBox = fakeCheckBox();
    const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

    expect(wrapper.find("label")).toBeTruthy();
  });

  it("renders a label with expected htmlFor attribute", () => {
    const mockCheckBox = fakeCheckBox();
    const wrapper = enzyme.shallow(<CheckBox {...mockCheckBox} />);

    expect(wrapper.find("Label").prop("htmlFor")).toEqual(mockCheckBox.id);
  });
});
