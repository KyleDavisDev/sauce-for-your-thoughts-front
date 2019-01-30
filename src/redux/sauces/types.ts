import { ISauce } from "../sauce/types";

// Used for action emitters and reducer
export interface ISaucesAction {
  type: string;
  total?: number;
  query?: IQuery;
  byId?: { [key: string]: ISauce };
  allIds?: number[];
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

// Used for state
export interface ISaucesState {
  allIds: number[];
  byId: null | { [key: string]: ISauce };
  total: null | number;
  query: null | IQuery;
}
