import * as React from "react";
import * as enzyme from "enzyme";

import Label, { LabelProps } from "./Label";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const mockLabel = (): LabelProps => ({
  children: casual.random_element([
    casual.string,
    fakeJSXElement(),
    [casual.string, fakeJSXElement()]
  ]),
  className: casual.string,
  htmlFor: casual.uuid
});

const mockLabels = new Array(ITERATION_SIZE).fill(null).map(mockLabel);

describe("<Label />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Label>""</Label>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockLabels.forEach((mockLabel: LabelProps) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct children", () => {
    mockLabels.forEach((mockLabel: LabelProps) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().children).toEqual(mockLabel.children);
    });
  });

  it("renders correct htmlFor tag", () => {
    mockLabels.forEach((mockLabel: LabelProps) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().htmlFor).toEqual(mockLabel.htmlFor);
    });
  });

  it("adds extra class to element", () => {
    mockLabels.forEach((mockLabel: LabelProps) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().className).toContain(mockLabel.className);
    });
  });
});
