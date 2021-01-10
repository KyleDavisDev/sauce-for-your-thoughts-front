import * as React from "react";
import * as enzyme from "enzyme";

import UserDropdown from "./UserDropdown";

describe("<UserDropdown />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<UserDropdown />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
