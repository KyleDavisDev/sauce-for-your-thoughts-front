import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
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

const mockFlashMessages = new Array(ITERATION_SIZE)
  .fill(null)
  .map(mockFlashMessage);

describe("<FlashMessage />", () => {
  it("renders", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.shallow(<FlashMessage {...fakeProps} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockFlashMessages.forEach(fakeProps => {
      const wrapper = enzyme.render(<FlashMessage {...fakeProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  // it("matches snapshot", () => {
  //   const wrapper = enzyme.shallow(<FlashMessage {...mockFlashMessage()} />);

  //   expect(wrapper).toMatchSnapshot();
  // });
});
