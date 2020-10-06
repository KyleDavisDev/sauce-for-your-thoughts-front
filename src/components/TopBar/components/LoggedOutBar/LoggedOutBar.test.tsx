import * as React from "react";
import * as enzyme from "enzyme";

import LoggedOutBar from "./LoggedOutBar";

describe("<LoggedOutBar />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<LoggedOutBar />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
