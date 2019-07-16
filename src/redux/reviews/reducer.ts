import { Reducer } from "redux";
import { IReviewsState, IReviewsAction, REVIEWS_ADDED } from "./types";

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
      // construct individual components
      const byReviewID = { ...state.byReviewID, ...action.byReviewID }; // concat new review to old
      const allReviewIDs = [
        ...state.allReviewIDs, // old HashIDs
        ...action.allReviewIDs.filter(
          x => state.allReviewIDs.indexOf(x) === -1 // concat only HashID that are not already in the array
        )
      ];

      // construct return object
      const obj: IReviewsState = {
        byReviewID,
        allReviewIDs
      };

      // Return obj
      return obj;
    }

    default:
      return state;
  }
};

export default reviewReducer;
