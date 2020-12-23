import * as React from "react";
import * as enzyme from "enzyme";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AppState } from "../../redux/configureStore";
import { ISauce, ISaucesState } from "../../redux/sauces/types";
import Flatn from "../Flatn/Flatn";
import { IUserState } from "../../redux/users/types";
import { IErrReturn } from "../Err/Err";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";

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
  ingredients: casual.random_element([undefined, casual.string]),
  author: casual.name,
  created: casual.unix_time, // Unix time (in seconds)
  types: casual.random_element([undefined, casual.array_of_words()]),
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

export const generateFakeSauces = (): ISauce[] =>
  new Array(casual.integer(1, 15)).fill(null).map(fakeSauce);

const selectRandomSlugs = (slugs: string[]): undefined | string[] => {
  return casual.random_element([
    undefined,
    slugs.length > 0
      ? slugs.filter(slug => {
          if (casual.random < 0.4) return slug;
          return;
        })
      : []
  ]);
};

export const fakeSaucesState = (): ISaucesState => {
  const sauces: ISauce[] = generateFakeSauces();
  const { allSlugs, bySlug } = Flatn.saucesArr({ sauces });

  const featured = selectRandomSlugs(allSlugs);

  const saucesWithNewestReviews = bySlug
    ? allSlugs.map(slug => {
        return { name: bySlug[slug].name, slug };
      })
    : [];

  return {
    allSlugs,
    bySlug,
    total: allSlugs.length,
    query: undefined,
    saucesWithNewestReviews,
    newest: undefined,
    featured,
    types: casual.array_of_words(),
    orders: ["Newest", "Name", "Times Reviewed", "Avg Rating"]
  };
};

const fakeUsersState = (): IUserState => ({
  self: casual.random_element([
    undefined,
    {
      token: casual.random_element([undefined, casual.uuid]),
      displayName: casual.random_element([undefined, casual.name]),
      avatarURL: casual.random_element([undefined, casual.url]),
      isAdmin: casual.random_element([undefined, casual.boolean])
    }
  ]),
  byDisplayName: undefined,
  allDisplayNames: undefined
});

export const fakeStore = () => {
  const middlewares = [thunk];
  const storeConfig = configureStore(middlewares);

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

const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));

function simulateInputChange(
  wrapper: ReactWrapper,
  name: string,
  value: string
) {
  wrapper
    // .find(`input[name='${name}']`)
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

const generateValidPassword = (MIN_PASSWORD_LENGTH: number = 8): string => {
  // generate length between minimum length and 3x the minimum length
  const _randomLength = casual.integer(
    MIN_PASSWORD_LENGTH,
    3 * MIN_PASSWORD_LENGTH
  );

  // turn generated length into random letters
  return new Array(_randomLength).fill(null).map(casual._letter).join("");
};

const generateInValidPassword = (MIN_PASSWORD_LENGTH: number = 8): string => {
  // generate length between minimum length and 3x the minimum length
  const _randomLength = casual.integer(1, MIN_PASSWORD_LENGTH - 1);

  // turn generated length into random letters
  return new Array(_randomLength).fill(null).map(casual._letter).join("");
};

// Function designed to resemble how a network error would look like.
// This will help the catch(err) only have to handle a single format
const generateErr = (): IErrReturn => {
  return {
    response: {
      data: {
        status: 400,
        msg: casual.string,
        isGood: false
      }
    }
  };
};

// lets us mount up a simple custom hook
const mountReactHook = hook => {
  const Component = ({ children }) => children(hook());
  const componentHook = {};
  let componentMount;

  act(() => {
    componentMount = enzyme.shallow(
      <Component>
        {hookValues => {
          Object.assign(componentHook, hookValues);
          return null;
        }}
      </Component>
    );
  });
  return { componentMount, componentHook };
};

export interface ImountReactHookWithReduxStore {
  componentMount: any;
  componentHook: any;
}
const mountReactHookWithReduxStore = (
  hook,
  store
): ImountReactHookWithReduxStore => {
  const Component = ({ children }) => children(hook());
  const componentHook = {};
  let componentMount;

  act(() => {
    componentMount = enzyme.mount(
      <Provider store={store}>
        <Component>
          {hookValues => {
            Object.assign(componentHook, hookValues);
            return null;
          }}
        </Component>
      </Provider>
    );
  });
  return { componentMount, componentHook };
};

export {
  casual,
  simulateInputChange,
  isDOMTypeElement,
  isComponent,
  wait,
  generateValidPassword,
  generateInValidPassword,
  generateErr,
  mountReactHook,
  mountReactHookWithReduxStore
};
