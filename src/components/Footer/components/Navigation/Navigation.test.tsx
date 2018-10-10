import * as React from "react";
import * as enzyme from "enzyme";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router-dom";

describe("<Navigation />", () => {
  const wrapper = enzyme.render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
