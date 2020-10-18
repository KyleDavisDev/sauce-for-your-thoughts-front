import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Toggle from "./Toggle";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

describe("<Toggle />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Toggle />);

    expect(wrapper).toBeTruthy();
  });
});
