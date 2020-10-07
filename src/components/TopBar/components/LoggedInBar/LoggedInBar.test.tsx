import * as React from "react";
import * as enzyme from "enzyme";

import LoggedInBar from "./LoggedInBar";
import { ITERATION_SIZE } from "../../../../utils/testUtils/testUtils";

describe("<LoggedInBar />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <LoggedInBar displayName={""} avatarURL={""} />
    );

    expect(wrapper).toBeTruthy();
  });
});
