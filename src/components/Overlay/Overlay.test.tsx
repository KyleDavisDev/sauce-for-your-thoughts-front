import * as React from "react";
import * as enzyme from "enzyme";

import { IOverlayProps, Overlay } from "./Overlay";
import {
  fakeJSXElement,
  casual,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

export const mockOverlay = (): IOverlayProps => ({
  children: fakeJSXElement(),
  className: casual.string,
  enabled: casual.random_element([undefined, casual.boolean])
});

const mockOverlays = new Array(ITERATION_SIZE).fill(null).map(mockOverlay);

describe("<Overlay />", () => {
  it("renders", () => {
    mockOverlays.forEach((mockOverlay: IOverlayProps) => {
      const wrapper = enzyme.shallow(
        <Overlay {...mockOverlay}>{mockOverlay.children}</Overlay>
      );

      expect(wrapper).toBeTruthy();
    });
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
