import { IReview } from "../reviews/types";
import { IUserRef } from "../users/types";

// Used for action emitters and reducer
export interface ISaucesAction {
  type: string;
  total?: number;
  query?: IQuery;
  byId?: { [key: string]: ISauce };
  allIds?: number[];
}

export interface ISauce {
  _id?: number;
  _addedToStore?: Date;
  name: string;
  ingredients: string;
  author: IUserRef;
  created: Date;
  types?: string[];
  maker: string;
  description: string;
  photo?: string;
  shu?: number | string;
  reviews?: IReview[];
  city?: string;
  state?: string;
  country?: string;
  slug?: string;
}

// Trimmed down for reference only
export interface ISauceRef {
  _id?: number | string;
  slug: string;
}

// Used for redux state
export interface ISaucesState {
  allIds: number[];
  byId: null | { [key: string]: ISauce };
  total: null | number;
  query: null | IQuery;
}

export interface IQuery {
  [key: string]: { sauces: number[] };
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
export const enum SaucesActionTypes {
  SAUCES_ADDED = "@@sauces/SAUCES_ADDED",
  UPDATE_SAUCE = "@@sauces/UPDATE_SAUCE",
  SAUCES_BY_TAG_FOUND = "@@sauces/SAUCES_BY_TAG_FOUND",
  SAUCE_FOUND = "@@sauces/SAUCE_FOUND"
}
