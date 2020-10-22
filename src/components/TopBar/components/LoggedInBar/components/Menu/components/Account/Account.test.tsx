import * as React from "react";
import * as enzyme from "enzyme";

import Account from "./Account";

describe("<Account />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Account />);

    expect(wrapper).toBeTruthy();
  });
});
