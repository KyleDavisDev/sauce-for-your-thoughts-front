import { API } from "../../utils/api/API";
import {
  IReviewsAction,
  ReviewsActionTypes,
  IReview,
  IReviewsState
} from "./types";
import { MyThunkResult } from "../configureStore";

/** @description add review(s) to store
 *  @param {number[]} allIds - array of review objects
 *  @param {IReview} byId - object with nested review objects
 */
export const addedReviews = ({
  reviews
}: {
  reviews: IReviewsState;
}): IReviewsAction => {
  return {
    type: ReviewsActionTypes.REVIEWS_ADDED,
    allReviewIDs: reviews.allReviewIDs,
    byReviewID: reviews.byReviewID
  };
};

/** @description add a single review to the DB
 *  @param {Object} data - all encompasing object
 *    @param {Object} data.user - holds user information
 *      @param {String} data.user.token - unique user identifier
 *    @param {Object} data.sauce - hold sauce information
 *      @param {String} data.sauce.token - unique sauce string
 *    @param {IReview} data.review
 *  @fires reviews#addedReview - add review to store
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const addReview = ({
  data
}: {
  data: { user: { token: string }; review: IReview };
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Add review
  await API.review.add(data);

  return null;
};
