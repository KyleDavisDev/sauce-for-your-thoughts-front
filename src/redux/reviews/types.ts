import { IUser } from "../users/types";

// Action strings constants
export const REVIEWS_ADDED = "REVIEWS_ADDED";
export const REVIEWS_UPDATED = "REVIEWS_UPDATED";
export const REVIEWS_CLEARED = "REVIEWS_CLEARED";
export const REVIEWS_UPDATED_DISPLAYNAME = "REVIEWS_UPDATED_DISPLAYNAME";

export interface IReviewSection {
  rating: number;
  txt: string;
}

// All actions emitted must follow this form
export interface IReviewsAction {
  type: string;
  allReviewIDs?: string[];
  byReviewID?: { [key: string]: IReview };
  oldDisplayName?: string;
  displayName?: string;
}

// Base review object
interface BaseReview {
  reviewID: string;
  sauce: string; // Sauce's slug
  created: number;
  overall: IReviewSection; // Only review bit that is required
  label?: IReviewSection;
  aroma?: IReviewSection;
  taste?: IReviewSection;
  heat?: IReviewSection;
  note?: IReviewSection;
  _addedToStore?: number; // unix time when the item was added to redux store
}

export interface IReview extends BaseReview {
  author: string; // User's displayName
}

export interface IReviewAPI extends BaseReview {
  author: IUser;
}

// Used for redux state
export interface IReviewState {
  allReviewIDs: string[];
  byReviewID: { [key: string]: IReview };
}

// Trimmed down for reference only
export interface IReviewRef {
  _id: number;
}

// Interface for sending a review to the server
export interface IReviewToServer {
  review: IReview;
}

// Interface for requesting a review to the server
export interface IReviewRequestFromServer {
  user: { token: string };
  sauce: { slug: string };
}
