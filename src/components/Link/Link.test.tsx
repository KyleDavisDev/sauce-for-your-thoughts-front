import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";

import Link from "./Link";

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    let wrapper = enzyme.render(
      <MemoryRouter>
        <Link>Text here</Link>
      </MemoryRouter>
    );
    expect(wrapper.find("a").text()).toEqual("Text here");

    wrapper = enzyme.render(
      <MemoryRouter>
        <Link>Other text</Link>
      </MemoryRouter>
    );
    expect(wrapper.find("a").text()).toEqual("Other text");
  });
});
