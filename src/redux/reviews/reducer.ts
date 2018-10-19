import { Reducer } from "redux";
import { IReviewsState, IReviewsAction, ReviewsActionTypes } from "./types";

const initialState: IReviewsState = {
  allIds: [],
  byId: {}
};

const reviewReducer: Reducer<IReviewsState> = (
  state: IReviewsState = initialState,
  action: IReviewsAction
): IReviewsState => {
  switch (action.type) {
    case ReviewsActionTypes.REVIEWS_ADDED:
      // construct return object
      return {
        byId: { ...state.byId, ...action.byId }, // concat new review to old
        allIds: [
          ...state.allIds, // old ids
          ...action.allIds.filter(
            x => state.allIds.indexOf(x) === -1 // concat only id that are not already in the array
          )
        ]
      };

    default:
      return state;
  }
};

export default reviewReducer;
