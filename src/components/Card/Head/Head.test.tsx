import * as React from "react";
import * as enzyme from "enzyme";

import Head, { IHeadProps } from "./Head";
import { casual, ITERATION_SIZE } from "../../../utils/testUtils/testUtils";

const fakeHead = (): IHeadProps => ({
  showLink: casual.random_element([undefined, casual.boolean]),
  to: casual.string,
  imageLink: casual.random_element([undefined, casual.string]),
  description: casual.random_element([undefined, casual.string])
});

const mockHead = new Array(ITERATION_SIZE).fill(null).map(fakeHead);

describe("<Head />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Head to="" />);

    expect(wrapper).toBeTruthy();
  });
});
