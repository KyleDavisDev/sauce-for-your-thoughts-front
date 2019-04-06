import { Reducer } from "redux";
import { IReviewsState, IReviewsAction, ReviewsActionTypes } from "./types";

const initialState: IReviewsState = {
  allHashIDs: [],
  byHashID: {}
};

const reviewReducer: Reducer<IReviewsState> = (
  state: IReviewsState = initialState,
  action: IReviewsAction
): IReviewsState => {
  switch (action.type) {
    case ReviewsActionTypes.REVIEWS_ADDED:
      // construct individual components
      const byHashID = { ...state.byHashID, ...action.byHashID }; // concat new review to old
      const allHashIDs = [
        ...state.allHashIDs, // old HashIDs
        ...action.allHashIDs.filter(
          x => state.allHashIDs.indexOf(x) === -1 // concat only HashID that are not already in the array
        )
      ];

      // construct return object
      const obj: IReviewsState = {
        byHashID,
        allHashIDs
      };

      // Return obj
      return obj;

    default:
      return state;
  }
};

export default reviewReducer;
