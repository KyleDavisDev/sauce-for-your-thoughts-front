import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

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
