import * as React from "react";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import { MockLink, MockButton } from "./types";

const ITERATION_SIZE = 8;
const REACT_REGEX = /react(\d+)?./i;

// seed it so we get consistent results
casual.seed(777);

const fakeLink = (): MockLink => ({
  text: casual.text,
  to: casual.url,
  target: casual.boolean ? "_blank" : "_self"
});

const fakeJSXElement = (): JSX.Element => {
  return casual.random_element([
    React.createElement("div", null, casual.string),
    React.createElement("span", null, casual.string)
  ]);
};

const fakeButton = (): MockButton => ({
  children: casual.random_element([fakeJSXElement(), casual.text]),
  displayType: casual.random_element(["outline", "solid"]),
  className: casual.string,
  type: casual.random_element(["button", "submit", "reset"]),
  onClick: jest.fn(),
  style: undefined,
  disabled: casual.boolean
});

const fakeLinks = () => [fakeLink(), fakeLink(), fakeLink()];
const fakeButtons = (): MockButton[] =>
  new Array(ITERATION_SIZE).fill(null).map(fakeButton);

function simulateInputChange(
  wrapper: ReactWrapper,
  name: string,
  value: string
) {
  wrapper
    .find(`input[name='${name}']`)
    .simulate("change", { target: { name, value } });
}

const isClassComponent = (component): boolean => {
  return (
    typeof component === "function" &&
    component.prototype &&
    !!component.prototype.isReactComponent
  );
};

// Ensure compatability with transformed code
const isFunctionComponent = (component): boolean => {
  return (
    typeof component === "function" &&
    String(component).includes("return") &&
    !!String(component).match(REACT_REGEX) &&
    String(component).includes(".createElement")
  );
};

const isElement = (typeElement): boolean => {
  return React.isValidElement(typeElement);
};

const isComponent = (component): boolean => {
  return isClassComponent(component) || isFunctionComponent(component);
};

const isDOMTypeElement = (typeElement): boolean => {
  return isElement(typeElement) && typeof typeElement.type === "string";
};

export {
  fakeLinks,
  fakeButtons,
  simulateInputChange,
  isDOMTypeElement,
  isComponent
};
