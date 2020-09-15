import * as React from "react";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import { MockCard } from "./types";

export const ITERATION_SIZE = 8;
const REACT_REGEX = /react(\d+)?./i;

// seed it so we get consistent results
casual.seed(777);

export const fakeJSXElement = (): JSX.Element => {
  return casual.random_element([
    React.createElement("div", { key: casual.uuid }, casual.string),
    React.createElement("span", { key: casual.uuid }, casual.string)
  ]);
};

const fakeCard = (): MockCard => ({
  title: casual.string,
  description: casual.string,
  to: casual.url,
  showLink: casual.boolean,
  imageLink: casual.url,
  className: casual.string,
  anchorText: casual.string
});

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

export { casual, simulateInputChange, isDOMTypeElement, isComponent };
