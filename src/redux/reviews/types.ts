import { IUserRef } from "../users/types";
import { ISauceRef } from "../sauce/types";

export interface IReviewSection {
  rating: number;
  txt: string;
}

// All actions emitted must follow this form
export interface IReviewsAction {
  type: string;
  allIds: number[];
  byId: { [key: string]: IReview };
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum ReviewsActionTypes {
  REVIEWS_ADDED = "@@reviews/REVIEWS_ADDED"
}

export interface IReview {
  _id: number;
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

// Used for state
// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface IReviewsState {
  readonly allIds: number[];
  readonly byId: null | { [key: string]: IReview };
}

// Trimmed down for reference only
export interface IReviewRef {
  _id: number;
}
