import * as React from "react";
import * as enzyme from "enzyme";

import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";
import RadioButton, { RadioButtonProps } from "./RadioButton";

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

      expect(wrapper.find("div").first().prop("className")).toContain(
        mockRadioButton.className
      );
    });
  });
});
