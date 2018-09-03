import { createStore, applyMiddleware, Dispatch, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { ISauce } from "../models/sauce";
import { IUser } from "../models/user";
import { IReview } from "../models/review";
import { initStoreAction } from "../actions/actions";
import rootReducer from "./reducers/rootReducer";

export interface IState {
  flashMessage: {
    isVisible: boolean;
    type: null;
    text: null | string;
    slug: null;
  };
  sauces: {
    allIds: number[];
    byId: { [key: string]: ISauce };
    total: number;
    query: {};
  };
  sauce: ISauce; // Remove this...?
  tags: string[]; // Remove this..?
  users: {
    allIds: number[];
    byId: { [key: string]: IUser };
    self: { token: null | string };
  };
  reviews: { allIds: number[]; byId: { [key: string]: IReview } };
}

export const initStore = () => {};

export const configureStore = () => {
  if (process.env.NODE_ENV === "production") {
    return createStore(rootReducer, intialState, applyMiddleware(thunk));
  } else {
    return createStore(
      rootReducer,
      intialState,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }
};
