import * as React from "react";
import * as enzyme from "enzyme";

import HeaderSimple from "./HeaderSimple";

describe("<HeaderSimple />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<HeaderSimple />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<HeaderSimple />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders header tag", () => {
    const wrapper = enzyme.shallow(<HeaderSimple />);

    expect(wrapper.find("header")).toBeTruthy();
  });
});
