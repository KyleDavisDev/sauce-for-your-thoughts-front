import * as React from "react";
import * as enzyme from "enzyme";

import Link from "./Link";

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    const wrapper = enzyme.shallow(<Link>Text here</Link>);
  });
});
