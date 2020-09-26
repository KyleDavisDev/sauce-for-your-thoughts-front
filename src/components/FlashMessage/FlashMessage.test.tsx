import * as React from "react";
import * as enzyme from "enzyme";

import { casual } from "../../utils/testUtils/testUtils";
import { FlashMessage, FlashMessageProps } from "./FlashMessage";

const mockFlashMessage = (): FlashMessageProps => ({
  className: casual.random_element([undefined, casual.string]),
  type: casual.random_element([undefined, "success", "warning", "alert"]),
  isVisible: casual.boolean,
  slug: casual.random_element([undefined, casual.url]),
  slugText: casual.random_element([undefined, casual.name]),
  text: casual.random_element([undefined, casual.string]),
  children: casual.random_element([undefined, casual.string])
});

describe("<FlashMessage />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<FlashMessage {...mockFlashMessage()} />);

    expect(wrapper).toBeTruthy();
  });
});
