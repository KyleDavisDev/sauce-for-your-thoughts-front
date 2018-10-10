import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";
import TopBar from "./TopBar";

describe("<TopBar />", () => {
  const wrapper = enzyme.render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
