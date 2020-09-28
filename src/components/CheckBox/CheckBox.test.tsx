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
});
