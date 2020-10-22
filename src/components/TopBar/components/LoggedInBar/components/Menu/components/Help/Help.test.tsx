import * as React from "react";
import * as enzyme from "enzyme";

import Help from "./Help";
import { ITERATION_SIZE } from "../../../../../../../../utils/testUtils/testUtils";

describe("<Help />", () => {
  const _title = "Need Help?";

  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Help />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Help />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Title component", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Help />);

      expect(wrapper.find("Title").exists()).toBeTruthy();
    });
  });

  it("passes expected value to Title", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Help />);

      expect(wrapper.find("Title").prop("children")).toEqual(_title);
    });
  });

  it("renders two Item components", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Help />);

      expect(wrapper.find("Item").length).toEqual(2);
    });
  });
});
