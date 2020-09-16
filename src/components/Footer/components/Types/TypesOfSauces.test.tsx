import * as React from "react";
import * as enzyme from "enzyme";
import Types from "./TypesOfSauces";
import { MemoryRouter } from "react-router-dom";

describe("<Types />", () => {
  const wrapper = enzyme.render(
    <MemoryRouter>
      <Types />
    </MemoryRouter>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
