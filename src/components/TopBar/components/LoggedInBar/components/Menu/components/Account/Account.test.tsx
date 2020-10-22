import * as React from "react";
import * as enzyme from "enzyme";

import Account from "./Account";
import { ITERATION_SIZE } from "../../../../../../../../utils/testUtils/testUtils";

describe("<Account />", () => {
  const _title = "Account";

  it("renders", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Title component", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper.find("Title").exists()).toBeTruthy();
    });
  });

  it("passes expected value to Title", () => {
    new Array(ITERATION_SIZE).fill(null).map(() => {
      const wrapper = enzyme.shallow(<Account />);

      expect(wrapper.find("Title").prop("children")).toEqual(_title);
    });
  });
});
