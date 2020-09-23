import * as React from "react";
import * as enzyme from "enzyme";

import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Footer />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();
  });
});
