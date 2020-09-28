import * as React from "react";
import * as enzyme from "enzyme";

import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import RadioButton, { RadioButtonProps } from "./RadioButton";
import { editSauce } from "../../redux/sauces/actions";

const fakeRadioButton = (): RadioButtonProps => ({
  checked: casual.boolean,
  id: casual.uuid,
  value: casual.name,
  label: casual.random_element([casual.string, fakeJSXElement()]),
  onClick: jest.fn(),
  name: casual.string,
  className: casual.random_element([undefined, casual.string])
});

const mockRadioButtons = new Array(ITERATION_SIZE)
  .fill(null)
  .map(fakeRadioButton);

describe("<RadioButton />", () => {
  it("renders", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      if (!mockRadioButton.className) return;

      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper.first().prop("className")).toContain(
        mockRadioButton.className
      );
    });
  });

  it("renders input with type radio", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper.find("input").prop("type")).toEqual("radio");
    });
  });

  it("renders input with expected name", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper.find("input").prop("name")).toEqual(mockRadioButton.name);
    });
  });

  it("renders input with expected value", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper.find("input").prop("value")).toEqual(
        mockRadioButton.value
      );
    });
  });

  it("renders input with expected id", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      expect(wrapper.find("input").prop("id")).toEqual(mockRadioButton.id);
    });
  });

  it("calls onClick when clicked", () => {
    mockRadioButtons.forEach(mockRadioButton => {
      const wrapper = enzyme.shallow(<RadioButton {...mockRadioButton} />);

      // check no click
      expect(mockRadioButton.onClick).not.toHaveBeenCalled();

      // click
      wrapper.find("input").simulate("click");

      // check click
      expect(mockRadioButton.onClick).toHaveBeenCalled();

      // click
      wrapper.find("input").simulate("click");

      // check click
      expect(mockRadioButton.onClick).toHaveBeenCalledTimes(2);
    });
  });
});
