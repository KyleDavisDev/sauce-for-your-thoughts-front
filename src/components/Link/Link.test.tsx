import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { Link } from "./Link";

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link to="#">""</Link>);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct text", () => {
    let wrapper = enzyme.render(
      <MemoryRouter>
        <Link to="#">Text here</Link>
      </MemoryRouter>
    );
    expect(wrapper.find("a").text()).toEqual("Text here");

    wrapper = enzyme.render(
      <MemoryRouter>
        <Link to="#">Other text</Link>
      </MemoryRouter>
    );
    expect(wrapper.find("a").text()).toEqual("Other text");
  });
});
