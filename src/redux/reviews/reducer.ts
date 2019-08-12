import { Reducer } from "redux";
import {
  IReviewsState,
  IReviewsAction,
  REVIEWS_ADDED,
  REVIEWS_UPDATED,
  REVIEWS_UPDATED_DISPLAYNAME
} from "./types";

const initialState: IReviewsState = {
  allReviewIDs: [],
  byReviewID: {}
};

const reviewReducer: Reducer<IReviewsState> = (
  state: IReviewsState = initialState,
  action: IReviewsAction
): IReviewsState => {
  switch (action.type) {
    case REVIEWS_ADDED: {
      const allReviewIDs = action.allReviewIDs
        ? [
            ...state.allReviewIDs, // old HashIDs
            ...action.allReviewIDs.filter(
              x => state.allReviewIDs.indexOf(x) === -1 // concat only HashID that are not already in the array
            )
          ]
        : [];

      // construct individual components
      const byReviewID = { ...state.byReviewID, ...action.byReviewID }; // concat new review to old

      // construct return object
      const obj: IReviewsState = {
        byReviewID,
        allReviewIDs
      };

      // Return obj
      return obj;
    }
    case REVIEWS_UPDATED: {
      // Simply overwrite old review with the new ones
      const byReviewID = { ...state.byReviewID, ...action.byReviewID };

      // return state
      return { ...state, byReviewID };
    }

    case REVIEWS_UPDATED_DISPLAYNAME: {
      // Grab variables from action.
      const { displayName, oldDisplayName } = action;
      // If cannot find then return immediately.
      if (!displayName || !oldDisplayName) return state;
      // If the same, return immediately
      if (displayName === oldDisplayName) return state;
      // init
      let byReviewID = {};

      // make sure we have .bySlug
      if (state.byReviewID && Object.keys(state.byReviewID).length > 0) {
        // Go through items and update name
        byReviewID = Object.keys(state.byReviewID).map(slug => {
          // make sure we have a review -- Here bc TS gets upset otherwise
          if (!state.byReviewID) return;

          // If the review doesn't have an author, can return now
          if (!state.byReviewID[slug].author) {
            return { ...state.byReviewID[slug] };
          }

          // Find old display name
          if (state.byReviewID[slug].author === oldDisplayName) {
            // update display name
            state.byReviewID[slug].author = displayName;
          }

          return { ...state.byReviewID[slug] };
        });
      } else {
        // Nothing to update since displayNAme is only in bySlug
        return state;
      }

      // Return
      return { ...state, byReviewID };
    }

    default:
      return state;
  }
};

export default reviewReducer;
