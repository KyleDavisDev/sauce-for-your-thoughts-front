import { createStore, applyMiddleware, combineReducers, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import flashMessage from "./flashMessage/reducer";
import sauces from "./sauces/reducer";
import reviews from "./reviews/reducer";
import users from "./users/reducer";
import { ISauce } from "./sauces/types";
import { IQuery } from "./sauces/types";
import { IUser } from "./users/types";
import { IReview } from "./reviews/types";
import { IFlashState } from "./flashMessage/types";
import Auth from "../utils/Auth/Auth";

const rootReducer = combineReducers({
  flashMessage,
  sauces,
  reviews,
  users
});

export interface IinitialState {
  sauces: {
    allSlugs?: string[];
    bySlug?: { [key: string]: ISauce };
    total?: number;
    query?: IQuery;
    types: string[];
    saucesWithNewestReviews: [];
  };
  users: {
    self: { token?: string; displayName?: string; avatar?: string };
    byDisplayName?: { [key: string]: IUser };
    allDisplayNames?: string[];
  };
  reviews: {
    byHashID?: { [key: string]: IReview };
    allHashIDs?: string[];
  };
  flashMessage: IFlashState;
}

export const configureStore = () => {
  // was of type 'object'
  const initialState: IinitialState = {
    sauces: {
      allSlugs: [],
      bySlug: {},
      total: 0,
      query: {},
      types: [
        "Hot Sauce",
        "BBQ Sauce",
        "Gravy",
        "Marinade",
        "Salsa",
        "Meat Sauce"
      ],
      saucesWithNewestReviews: []
    },
    users: {
      self: {
        token: Auth.isUserAuthenticated() ? Auth.getToken() : undefined,
        displayName: Auth.isUserAuthenticated ? Auth.getName() : undefined
      },
      byDisplayName: {},
      allDisplayNames: []
    },
    reviews: { byHashID: {}, allHashIDs: [] },
    flashMessage: { isVisible: false, type: null, text: null, slug: null }
  };

  if (process.env.NODE_ENV === "production") {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
  } else {
    return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }
};

// Defining thunk properties
export type MyThunkResult<R> = ThunkAction<R, IinitialState, undefined, Action>;
// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatch = ThunkDispatch<IinitialState, undefined, Action>;
