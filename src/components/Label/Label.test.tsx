import * as React from "react";
import * as enzyme from "enzyme";

import Label from "./Label";
import { fakeLabels } from "../../utils/testUtils/testUtils";
import { MockLabel } from "../../utils/testUtils/types";

const mockLabels = fakeLabels();

describe("<Label />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Label>""</Label>);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockLabels.forEach((mockLabel: MockLabel) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct children", () => {
    mockLabels.forEach((mockLabel: MockLabel) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().children).toEqual(mockLabel.children);
    });
  });

  it("renders correct htmlFor tag", () => {
    mockLabels.forEach((mockLabel: MockLabel) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().htmlFor).toEqual(mockLabel.htmlFor);
    });
  });

  it("adds extra class to element", () => {
    mockLabels.forEach((mockLabel: MockLabel) => {
      const wrapper = enzyme.shallow(
        <Label {...mockLabel}>{mockLabel.children}</Label>
      );

      expect(wrapper.props().className).toContain(mockLabel.className);
    });
  });
});
