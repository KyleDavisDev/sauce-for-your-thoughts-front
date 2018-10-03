import * as React from "react";
import * as enzyme from "enzyme";
import Peppers from "./Peppers";
import { MemoryRouter } from "react-router-dom";

describe("<Peppers />", () => {
  const wrapper = enzyme.render(
    <MemoryRouter>
      <Peppers />
    </MemoryRouter>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
