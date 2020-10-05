// import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import TextArea from "./TextArea";

let error = console.error;

describe("<TextArea />", () => {
  it("renders", () => {
    const wrapper = enzyme.render(<TextArea onChange={() => {}} />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.render(<TextArea onChange={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});
