import * as React from "react";
import * as enzyme from "enzyme";

import Admin from "./Admin";
import { ITERATION_SIZE } from "../../../../../../../../utils/testUtils/testUtils";

describe("<Admin />", () => {
  const _title = "Admin";

  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Admin />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Admin />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Title component", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Admin />);

      expect(wrapper.find("Title").exists()).toBeTruthy();
    });
  });

  it("passes expected value to Title", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Admin />);

      expect(wrapper.find("Title").prop("children")).toEqual(_title);
    });
  });

  it("renders one Item components", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Admin />);

      expect(wrapper.find("Item").length).toEqual(1);
    });
  });
});
