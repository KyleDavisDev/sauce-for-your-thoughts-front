import * as React from "react";
import * as enzyme from "enzyme";
import casual from "casual";
import { ReactWrapper } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AppState } from "../../redux/configureStore";
import { ISauce, ISaucesState } from "../../redux/sauces/types";
import Flatn from "../Flatn/Flatn";
import { IUser, IUserState } from "../../redux/users/types";
import { IErrReturn } from "../Err/Err";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import {
  IReview,
  IReviewSection,
  IReviewState
} from "../../redux/reviews/types";

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
  author: casual.full_name,
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
    new Array(casual.integer(0, 10)).fill(null).map(x => casual.word)
  ]),
  city: casual.random_element([undefined, casual.city]),
  state: casual.random_element([undefined, casual.state]),
  country: casual.random_element([undefined, casual.country]),
  slug: casual.random_element([undefined, casual.uuid])
});

export const generateFakeSauces = (): ISauce[] =>
  new Array(casual.integer(5, 15)).fill(null).map(fakeSauce);

export const fakeReviewItem = () => {
  return {
    rating: casual.integer(0, 5),
    txt: casual.random_element([undefined, casual.sentence])
  };
};

export const fakeReview = (): IReview => {
  return {
    reviewID: generateValidPassword(),
    author: casual.name,
    sauce: casual.name,
    created: casual.unix_time,
    overall: fakeReviewItem(),
    label: casual.random_element([undefined, fakeReviewItem()]),
    aroma: casual.random_element([undefined, fakeReviewItem()]),
    taste: casual.random_element([undefined, fakeReviewItem()]),
    heat: casual.random_element([undefined, fakeReviewItem()]),
    note: casual.random_element([undefined, fakeReviewItem()]),
    _addedToStore: casual.random_element([undefined, casual.unix_time])
  };
};

export const generateFakeReviews = (): IReview[] => {
  return new Array(casual.integer(1, 15)).fill(null).map(fakeReview);
};

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

export const fakeUser = (displayName?: string): IUser => {
  // _id?: number;
  // _addedToStore?: number; // Unix time for when added to redux
  // reviews?: string[];
  // created: number;
  // displayName: string;
  // email?: string;
  // avatarURL?: string;

  return {
    created: casual.unix_time,
    displayName: displayName ?? casual.full_name,
    email: casual.email,
    avatarURL: casual.url
  };
};

export const fakeSelf = () => {
  return {
    token: casual.random_element([undefined, casual.uuid]),
    displayName: casual.random_element([undefined, casual.name]),
    avatarURL: casual.random_element([undefined, casual.url]),
    isAdmin: casual.random_element([undefined, casual.boolean])
  };
};

export const fakeUsersState = ({
  authors
}: {
  authors: string[];
}): IUserState => {
  // 1) Generate fake users
  const _users = authors.map(x => fakeUser(x));

  // 2) Sort users into appropriate places
  const byDisplayName: { [key: string]: IUser } = {};
  const allDisplayNames: string[] = [];
  _users.forEach(user => {
    const { displayName } = user;

    allDisplayNames.push(displayName);

    byDisplayName.displayName = user;
  });

  // 3) Return full object
  return {
    self: casual.random_element([undefined, fakeSelf()]),
    byDisplayName,
    allDisplayNames
  };
};

export const fakeReviewState = ({
  reviewIDs,
  authors
}: {
  reviewIDs: string[];
  authors: string[];
}): IReviewState => {
  // 1) Create reviews
  const _reviews: IReview[] = generateFakeReviews();

  // 2) Sort reviews into appropriate areas
  const allReviewIDs: string[] = [];
  const byReviewID: { [key: string]: IReview } = {};
  _reviews.forEach(review => {
    const id = review.reviewID;

    // Push id into reviews array
    allReviewIDs.push(id);

    // Push review into reviews obj
    byReviewID.id = review;
  });

  return { allReviewIDs, byReviewID };
};

// Loop through sauces obj and grab the authors from each of the sauces
const getAuthorsFromSauces = (sauces: ISaucesState): string[] => {
  const authors: string[] = [];

  for (let i = 0, len = sauces.allSlugs.length; i < len; i++) {
    // Get the sauce
    const slug = sauces.allSlugs[i];
    const sauce = sauces.bySlug?.[slug];
    if (!sauce) continue;

    // If we are here, then sauce is valid and we can grab the author
    authors.push(sauce.author);
  }

  return authors;
};

const getReviewIDsFromSauces = (sauces: ISaucesState): string[] => {
  const reviews: string[] = [];

  for (let i = 0, len = sauces.allSlugs.length; i < len; i++) {
    // 1) Get the sauce
    const slug = sauces.allSlugs[i];
    const sauce = sauces.bySlug?.[slug];
    if (!sauce) continue;

    // 2) Sauce is good, grab reviews
    const _reviews = sauce.reviews;
    if (!_reviews) continue;
    if (_reviews.length === 0) continue;

    // 3) Reviews are good, push to our collector
    reviews.push(..._reviews);
  }

  return reviews;
};

export const fakeStore = () => {
  // 1) initialize
  const middlewares = [thunk];
  const storeConfig = configureStore(middlewares);

  // 2) Populate store
  // 2.1) Generate Sauces State -- Many items will use this state later
  const sauces = fakeSaucesState();
  // 2.2) All of the authors of the sauces should exist in our UserState so go in and grab authors
  const _authors = getAuthorsFromSauces(sauces);
  // 2.3) All of the reviews of the sauces should exist in our ReviewState so go in and grab reviews
  const _reviewIDs = getReviewIDsFromSauces(sauces);
  // 2.4) Generate Users State based on the authors of the sauces
  const users = fakeUsersState({ authors: _authors });
  // 2.4) Generate Reviews State based on the authorship and review ID
  const reviews = fakeReviewState({ reviewIDs: _reviewIDs, authors: _authors });
  // 2.5) Combine it all to create the total store
  const store: AppState = { sauces, users, reviews };

  // 3) Return configured store
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

// Ensure compatibility with transformed code
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

export const isDOMTypeElement = (typeElement): boolean => {
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
export const mountReactHook = hook => {
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
  isComponent,
  wait,
  generateValidPassword,
  generateInValidPassword,
  generateErr,
  mountReactHookWithReduxStore
};
