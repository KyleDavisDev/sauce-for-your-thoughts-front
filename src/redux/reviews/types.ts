import { IUserRef } from "../users/types";
import { ISauceRef } from "../sauces/types";

export interface IReviewSection {
  rating: number;
  txt: string;
}

// All actions emitted must follow this form
export interface IReviewsAction {
  type: string;
  allHashIDs: string[];
  byHashID: { [key: string]: IReview };
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
  _id?: number | string;
  hashID?: string;
  author: IUserRef; // User reference
  sauce: ISauceRef;
  created: string;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
}

// Used for redux state
export interface IReviewsState {
  allHashIDs: string[];
  byHashID: { [key: string]: IReview };
}

// Trimmed down for reference only
export interface IReviewRef {
  _id: number;
}
