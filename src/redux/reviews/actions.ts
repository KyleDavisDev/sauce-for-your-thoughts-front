import { API } from "../../utils/api/API";
import {
  IReviewsAction,
  REVIEWS_ADDED,
  REVIEWS_UPDATED,
  IReview,
  IReviewsState,
  REVIEWS_CLEARED
} from "./types";
import { MyThunkResult } from "../configureStore";
import Flatn from "../../utils/Flatn/Flatn";

/** @description add review(s) to store
 *  @param {object} reviews - container object
 *  @param {String[]} reviews.allReviewIDs - array of review objects
 *  @param {IReview} reviews.byReviewID - object with nested review objects
 */
export const addedReviews = ({
  reviews
}: {
  reviews: IReviewsState;
}): IReviewsAction => {
  return {
    type: REVIEWS_ADDED,
    allReviewIDs: reviews.allReviewIDs,
    byReviewID: reviews.byReviewID
  };
};

/** @description Reset reviews in store
 *  @return {IReviewsAction}
 */
export const reviewsCleared = (): IReviewsAction => {
  return {
    type: REVIEWS_CLEARED
  };
};

/** @description add review(s) to store
 *  @param {object} reviews - container object
 *  @param {IReview} reviews.byReviewID - object with nested review objects
 */
export const updatedReviews = ({
  byReviewID
}: {
  byReviewID: { [key: string]: IReview };
}): IReviewsAction => {
  return {
    type: REVIEWS_UPDATED,
    byReviewID
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

/** @description Edit a single review
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
export const editReview = ({
  data
}: {
  data: { user: { token: string }; review: IReview };
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Add review
  await API.review.edit(data);

  // Normalize reviews
  const { byReviewID } = Flatn.reviews({
    reviews: [data.review]
  });
  // Update specific review in store
  dispatch(updatedReviews({ byReviewID }));

  return null;
};
