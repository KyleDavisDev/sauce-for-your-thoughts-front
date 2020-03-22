import { API } from "../../utils/api/API";
import {
  IReviewsAction,
  REVIEWS_ADDED,
  REVIEWS_UPDATED,
  IReview,
  IReviewsState,
  REVIEWS_CLEARED,
  REVIEWS_UPDATED_DISPLAYNAME,
  IReviewToServer
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

/** @description Update a single user's display name wherever it is found
 *  @param {String} displayName - new person's name
 *  @param {String} oldDisplayName - old person's name
 *  @return {IUserAction} sauce and action type
 */
export const updatedDisplayName = ({
  oldDisplayName,
  displayName
}: {
  oldDisplayName: string;
  displayName: string;
}): IReviewsAction => ({
  type: REVIEWS_UPDATED_DISPLAYNAME,
  oldDisplayName,
  displayName
});

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
 *  @param {IReviewToServer} data - all encompasing object
 *  @fires reviews#addedReview - add review to store
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const addReview = (
  data: IReviewToServer
): MyThunkResult<Promise<null>> => async dispatch => {
  // Add review
  await API.review.add(data);

  return null;
};

/** @description Edit a single review
 *  @param {IReviewToServer} data - all encompasing object
 *  @fires reviews#addedReview - add review to store
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const editReview = (
  data: IReviewToServer
): MyThunkResult<Promise<null>> => async dispatch => {
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
