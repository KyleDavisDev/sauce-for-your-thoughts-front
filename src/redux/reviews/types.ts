import { IUser } from "../users/types";

// Action strings constants
export const REVIEWS_ADDED = "REVIEWS_ADDED";
export const REVIEWS_UPDATED = "REVIEWS_UPDATED";
export const REVIEWS_CLEARED = "REVIEWS_CLEARED";

export interface IReviewSection {
  rating: number;
  txt: string;
}

// All actions emitted must follow this form
export interface IReviewsAction {
  type: string;
  allReviewIDs?: string[];
  byReviewID?: { [key: string]: IReview };
}

export interface IReview {
  _id?: number | string;
  _addedToStore?: number;
  reviewID?: string;
  author: string; // User's displayName
  sauce: string; // Sauce's slug
  created: number;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
}

export interface IReviewAPI {
  _id?: number | string;
  _addedToStore?: number;
  reviewID?: string;
  author: IUser; // User's displayName
  sauce: string; // Sauce's slug
  created: number;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
}

// Used for redux state
export interface IReviewsState {
  allReviewIDs: string[];
  byReviewID: { [key: string]: IReview };
}

// Trimmed down for reference only
export interface IReviewRef {
  _id: number;
}
