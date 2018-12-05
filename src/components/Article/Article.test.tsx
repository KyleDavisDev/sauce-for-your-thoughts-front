import * as React from "react";
import * as enzyme from "enzyme";

import Article from "./Article";

describe("<Article>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <Article>
        <span>hello!</span>
      </Article>
    );
    expect(wrapper).toBeTruthy();
  });
});
