import * as React from "react";
import * as enzyme from "enzyme";

import { casual, fakeJSXElement } from "../../utils/testUtils/testUtils";
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

describe("<RadioButton />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<RadioButton {...fakeRadioButton()} />);

    expect(wrapper).toBeTruthy();
  });
});
