import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import flashMessage from "./flashMessage/reducer";
import reviews from "./reviews/reducer";
import { IReview, IReviewState } from "./reviews/types";
import sauces from "./sauces/reducer";
import users from "./users/reducer";
import { IUser, IUserState } from "./users/types";
import { ISaucesState } from "./sauces/types";

const rootReducer = combineReducers({
  flashMessage,
  sauces,
  reviews,
  users
});

export interface AppState {
  sauces: ISaucesState;
  users: IUserState;
  reviews: IReviewState;
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
              "All",
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
          reviews: { byReviewID: {}, allReviewIDs: [] }
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
