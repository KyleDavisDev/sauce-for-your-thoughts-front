import * as React from "react";
import * as enzyme from "enzyme";

import SauceType, { ISauceTypeProps } from "./SauceType";
import casual from "casual";

const item = () => ({
  value: casual.string,
  checked: casual.boolean,
  key: casual.string
});

const fakeSauceType = (): ISauceTypeProps => {
  const typesOfSauces = {};
  for (let i = 0, len = casual.integer(0, 20); i < len; i++) {
    typesOfSauces[casual.string] = item();
  }

  return {
    typesOfSauces,
    onCheckBoxClick: jest.fn()
  };
};

describe("<SauceType />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<SauceType {...fakeSauceType()} />);

    expect(wrapper).toBeTruthy();
  });
});
