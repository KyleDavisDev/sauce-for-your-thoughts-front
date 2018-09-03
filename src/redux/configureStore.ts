import { createStore, applyMiddleware, Dispatch, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { TodoItem } from "../model/TodoItem";
import { initStoreAction } from "../actions/actions";
import rootReducer from "./reducers/rootReducer";

// Sauce shape
export interface ISauce {
  _id: number;
  maker: string;
  shu: null | number;
  location?: {
    city: null | string;
    state: null | string;
    country: null | string;
  };
  description: string;
  peppers: null | string[];
}

// Trimmed down for reference only
export interface ISauceRef {
  _id: number;
}

// User shape
export interface IUser {
  _id: number;
  name?: string;
  email?: string;
}

// Trimmed down for reference only
export interface IUserRef {
  _id: number;
}

export interface IReviewSection {
  rating: number;
  txt: string;
}

export interface IReview {
  author: IUserRef; // User reference
  sauce: ISauceRef;
  created: Date;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
}

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
    self: { token: null | string };
    byId: { [key: string]: IUser };
    allIds: number[];
  };
  reviews: { byId: { [key: string]: IReview }; allIds: string[] };
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
