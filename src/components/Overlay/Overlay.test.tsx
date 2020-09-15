import * as React from "react";
import * as enzyme from "enzyme";

import { Overlay } from "./Overlay";

describe("<Overlay />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Overlay>123</Overlay>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Overlay>123</Overlay>);

    expect(wrapper).toMatchSnapshot();
  });

  it("adds classes to parent", () => {
    const tmpClassName = "asdfasdfads asdjfv kk211 ps--a ";
    const wrapper = enzyme.shallow(
      <Overlay className={tmpClassName}>123</Overlay>
    );

    expect(wrapper.props().className).toContain(tmpClassName);
  });

  it("contains expected children", () => {
    const tmpChildren = (
      <>
        <div>howdy</div>
        <span>hi</span>
      </>
    );
    const wrapper = enzyme.shallow(<Overlay>{tmpChildren}</Overlay>);

    expect(wrapper.props().children).toEqual(tmpChildren);
  });
});
