import * as React from "react";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import { MockLink, MockButton } from "./types";

// seed it so we get consistent results
casual.seed(777);

const fakeLink = (): MockLink => ({
  text: casual.text,
  to: casual.url,
  target: casual.boolean ? "_blank" : "_self"
});

const fakeButton = (): MockButton => ({
  children: React.createElement("div", null, casual.string),
  displayType: casual.random_element(["outline", "solid"]),
  className: casual.string,
  type: casual.random_element(["button", "submit", "reset"]),
  onClick: () => {},
  style: undefined,
  disabled: casual.boolean
});

const fakeLinks = () => [fakeLink(), fakeLink(), fakeLink()];
const fakeButtons = () => [fakeButton(), fakeButton(), fakeButton()];

function simulateInputChange(
  wrapper: ReactWrapper,
  name: string,
  value: string
) {
  wrapper
    .find(`input[name='${name}']`)
    .simulate("change", { target: { name, value } });
}

export { fakeLinks, fakeButtons, simulateInputChange };
