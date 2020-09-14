import * as React from "react";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import { MockLink, MockButton, MockCard, MockLabel, MockList } from "./types";

const ITERATION_SIZE = 8;
const REACT_REGEX = /react(\d+)?./i;

// seed it so we get consistent results
casual.seed(777);

const fakeLink = (): MockLink => ({
  children: casual.random_element([
    casual.string,
    fakeJSXElement(),
    [casual.string, fakeJSXElement()]
  ]),
  href: casual.url,
  className: casual.boolean ? casual.string : undefined,
  target: casual.boolean
    ? casual.random_element(["_blank", "_self"])
    : undefined
});

const fakeJSXElement = (): JSX.Element => {
  return casual.random_element([
    React.createElement("div", { key: casual.uuid }, casual.string),
    React.createElement("span", { key: casual.uuid }, casual.string)
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

const fakeCard = (): MockCard => ({
  title: casual.string,
  description: casual.string,
  to: casual.url,
  showLink: casual.boolean,
  imageLink: casual.url,
  className: casual.string,
  anchorText: casual.string
});

const fakeLabel = (): MockLabel => ({
  children: casual.random_element([
    casual.string,
    fakeJSXElement(),
    [casual.string, fakeJSXElement()]
  ]),
  className: casual.string,
  htmlFor: casual.uuid
});

const fakeList = (): MockList => ({
  className: casual.random_element([undefined, casual.string]),
  title: casual.string,
  items: new Array(casual.integer(0, 25))
    .fill(null)
    .map(() => ({ link: casual.url, text: casual.text, id: casual.uuid }))
});

const fakeLinks = (): MockLink[] =>
  new Array(ITERATION_SIZE).fill(null).map(fakeLink);
const fakeButtons = (): MockButton[] =>
  new Array(ITERATION_SIZE).fill(null).map(fakeButton);
const fakeLabels = (): MockLabel[] =>
  new Array(ITERATION_SIZE).fill(null).map(fakeLabel);
const fakeLists = (): MockList[] =>
  new Array(ITERATION_SIZE).fill(null).map(fakeList);

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
  fakeLabels,
  fakeLists,
  simulateInputChange,
  isDOMTypeElement,
  isComponent
};
