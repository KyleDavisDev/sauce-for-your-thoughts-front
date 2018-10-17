import { ISauce } from "../sauce/types";
import { IReview } from "../reviews/types";

export interface IAction {
  type: string;
  sauces: {
    byId: null | { [key: string]: ISauce };
    allIds: null | number[];
  };
  query: null | { [key: string]: { sauces: number[] } };
  total: number;
}

export interface IaddSauces {
  user: { token: string };
  sauce: ISauce;
  review: IReview;
  photo: Blob;
}

export interface IbyID {
  [key: string]: ISauce;
}

export interface IQuery {
  [key: string]: { sauces: number[] };
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum SaucesActionTypes {
  SAUCES_ADDED = "@@sauces/SAUCES_ADDED",
  UPDATE_SAUCE = "@@sauces/UPDATE_SAUCE",
  SAUCES_BY_TAG_FOUND = "@@sauces/SAUCES_BY_TAG_FOUND",
  SAUCE_FOUND = "@@sauces/SAUCE_FOUND"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ISauces {
  readonly allIds: number[];
  readonly byId: null | IbyID;
  readonly total: null | number;
  readonly query: null | IQuery;
}

export interface IActionSauces {
  readonly type: string;
  readonly sauces?: ISauce[];
  readonly sauce?: ISauce;
  readonly total?: number;
  readonly query?: IQuery;
}
