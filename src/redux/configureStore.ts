import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import flashMessage from "./flashMessage/reducer";
import sauces from "./sauces/reducer";
import reviews from "./reviews/reducer";
import users from "./users/reducer";
import { ISauce } from "./sauce/types";
import { IQuery } from "./sauces/types";
import { IUser } from "./users/types";
import { IReview } from "./reviews/types";
import { IFlashState } from "./flashMessage/types";

const rootReducer = combineReducers({
  flashMessage,
  sauces,
  reviews,
  users
});

export interface IinitialState {
  sauces: {
    allIds?: string[];
    byId?: { [key: string]: ISauce };
    total?: number;
    query?: IQuery;
  };
  users: {
    self: { token?: string; displayName?: string; avatar?: string };
    byId?: { [key: string]: IUser };
    allIds?: string[];
  };
  reviews: {
    byId?: { [key: string]: IReview };
    allIds?: string[];
  };
  flashMessage: IFlashState;
}

export const configureStore = () => {
  const initialState: object = {
    sauces: {
      allIds: [],
      byId: {},
      total: 0,
      query: {}
    },
    users: { self: {}, byId: {}, allIds: [] },
    reviews: { byId: {}, allIds: [] },
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
