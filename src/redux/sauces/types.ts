export interface ISauce {
  _id?: number;
  _addedToStore?: number; // Unix time added to redux store
  _full?: boolean; // Whether we have full sauce or partial
  _related?: [{ name: string; slug: string }]; // List of related sauces
  name: string;
  ingredients: string;
  author: string;
  created: Date;
  types?: string[];
  maker: string;
  description: string;
  photo?: string;
  shu?: number | string;
  reviews?: string[];
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

// Add Sauces to redux action
export interface IAddSaucesAction {
  allSlugs: string[];
  bySlug?: { [key: string]: ISauce };
  total?: number;
  query?: IQuery;
  saucesWithNewestReviews?: Array<{ name: string; slug: string }>;
}

// Used for action emitters and reducer
export interface ISaucesReturnAction extends IAddSaucesAction {
  type: string;
}

// Used for redux state
export interface ISaucesState {
  allSlugs: string[];
  bySlug?: { [key: string]: ISauce };
  total?: number;
  query?: IQuery;
  saucesWithNewestReviews?: Array<{ name: string; slug: string }>;
}

export interface IQuery {
  [key: string]: string[];
}

// Params we can pass to API
export interface SaucesParams {
  page: number;
  limit: number;
  order: string;
  type: string;
}

// Action strings
export const SAUCES_ADDED = "SAUCES_ADDED";
export const UPDATE_SAUCE = "UPDATE_SAUCE";
export const SAUCES_BY_TAG_FOUND = "SAUCES_BY_TAG_FOUND";
export const SAUCE_FOUND = "SAUCE_FOUND";

// Collection of possible sauces Action Types
export type SaucesActionTypes = IAddSaucesAction;
