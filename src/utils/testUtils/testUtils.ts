import * as React from "react";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import configureStore from "redux-mock-store";

import { MockCard } from "./types";
import { AppState } from "../../redux/configureStore";
import { ISauce, ISaucesState } from "../../redux/sauces/types";
import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import Flatn from "../Flatn/Flatn";
import { IUserState } from "../../redux/users/types";

export const ITERATION_SIZE = 32;
const REACT_REGEX = /react(\d+)?./i;

// seed it so we get consistent results
casual.seed(777);

const relatedSauce = () => ({
  name: casual.name,
  slug: casual.uuid
});

export const fakeSauce = (): ISauce => ({
  _id: casual.random_element([undefined, casual.integer(1, 500)]),
  _addedToStore: casual.random_element([undefined, casual.unix_time]), // Unix time (in seconds) added to redux store
  _full: casual.random_element([undefined, casual.boolean]), // Whether we have full sauce or partial
  _related: casual.random_element([
    undefined,
    new Array(ITERATION_SIZE).fill(null).map(relatedSauce)
  ]), // List of related sauces
  isAdminApproved: casual.random_element([undefined, casual.boolean]),
  name: casual.name,
  ingredients: casual.string,
  author: casual.name,
  created: casual.unix_time, // Unix time (in seconds)
  types: casual.array_of_words(),
  maker: casual.name,
  description: casual.string,
  photo: casual.random_element([undefined, casual.url]),
  shu: casual.random_element([
    undefined,
    casual.integer(1, 500),
    casual.integer(1, 500).toString()
  ]),
  reviews: casual.random_element([
    undefined,
    new Array(ITERATION_SIZE).fill(null).map(x => casual.word)
  ]),
  city: casual.random_element([undefined, casual.city]),
  state: casual.random_element([undefined, casual.state]),
  country: casual.random_element([undefined, casual.country]),
  slug: casual.random_element([undefined, casual.uuid])
});

export const fakeSaucesState = (): ISaucesState => {
  const sauces: ISauce[] = new Array(casual.integer(1, 15))
    .fill(null)
    .map(fakeSauce);
  const { allSlugs, bySlug } = Flatn.saucesArr({ sauces });

  return {
    allSlugs,
    bySlug,
    total: allSlugs.length,
    query: undefined, 
    saucesWithNewestReviews: undefined, 
    newest: undefined, 
    featured: undefined, 
    types: casual.array_of_words(),
    orders: ["Newest", "Name", "Times Reviewed", "Avg Rating"]
  };
};

const fakeUsersState = (): IUserState => ({  
    self: casual.random_element([undefined, {
      token: casual.random_element([undefined, casual.uuid]),
      displayName: casual.random_element([undefined, casual.name]),
      avatarURL: casual.random_element([undefined, casual.url]),
      isAdmin: casual.random_element([undefined, casual.boolean])
    }]),
    byDisplayName: undefined, 
    allDisplayNames: undefined   
})

export const fakeStore = () => {
  const storeConfig = configureStore([]);

  const store: AppState = {
    sauces: fakeSaucesState(),
    users: fakeUsersState(),
    reviews: {
      byReviewID: undefined, 
      allReviewIDs: undefined 
    }
  };

  return storeConfig(store);
};

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
