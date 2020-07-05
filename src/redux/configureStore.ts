import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import flashMessage from "./flashMessage/reducer";
import { IFlashState } from "./flashMessage/types";
import reviews from "./reviews/reducer";
import { IReview } from "./reviews/types";
import sauces from "./sauces/reducer";
import { IQuery, ISauce } from "./sauces/types";
import users from "./users/reducer";
import { IUser } from "./users/types";

const rootReducer = combineReducers({
  flashMessage,
  sauces,
  reviews,
  users
});

export interface ISaucesState {
  allSlugs?: string[];
  bySlug?: { [key: string]: ISauce };
  total?: number;
  query?: IQuery;
  types: string[];
  orders: string[];
  saucesWithNewestReviews: Array<{ name: string; slug: string }>;
  newest: string[];
  featured: string[];
}

export interface AppState {
  sauces: ISaucesState;
  users: {
    self: {
      token?: string;
      displayName?: string;
      avatarURL?: string;
      isAdmin?: boolean;
    };
    byDisplayName?: { [key: string]: IUser };
    allDisplayNames?: string[];
  };
  reviews: {
    byReviewID?: { [key: string]: IReview };
    allReviewIDs?: string[];
  };
  flashMessage: IFlashState;
}

export const configureStore = (initState?: AppState) => {
  const initialState: AppState =
    !initState && initState !== null
      ? {
          sauces: {
            allSlugs: [],
            bySlug: {},
            total: 0,
            query: {},
            types: [
              "Hot Sauce",
              "Marinade",
              "BBQ Sauce",
              "Salsa",
              "Gravy",
              "Meat Sauce",
              "Wing Sauce",
              "Curry"
            ],
            orders: ["Newest", "Name", "Times Reviewed", "Avg Rating"],
            saucesWithNewestReviews: [],
            newest: [],
            featured: []
          },
          users: {
            self: {
              token: undefined,
              displayName: undefined,
              avatarURL: undefined,
              isAdmin: undefined
            },
            byDisplayName: {},
            allDisplayNames: []
          },
          reviews: { byReviewID: {}, allReviewIDs: [] },
          flashMessage: { isVisible: false, type: null, text: null, slug: null }
        }
      : initState;

  if (process.env.NODE_ENV === "prod") {
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
export type MyThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;
// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatch = ThunkDispatch<AppState, undefined, Action>;
