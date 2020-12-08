import { API } from "../../utils/api/API";
import {
  IReviewsAction,
  REVIEWS_ADDED,
  REVIEWS_UPDATED,
  IReview,
  IReviewsState,
  REVIEWS_CLEARED,
  REVIEWS_UPDATED_DISPLAYNAME,
  IReviewToServer,
  IReviewRequestFromServer
} from "./types";
import { MyThunkResult } from "../configureStore";
import Flatn from "../../utils/Flatn/Flatn";
import { AxiosResponse } from "axios";

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
  const review = await API.review.add(data);

  // Normalize reviews
  const { byReviewID, allReviewIDs } = Flatn.reviews({
    reviews: [review]
  });
  // Create obj to redux
  const normalizedReviews: IReviewsState = { byReviewID, allReviewIDs };
  // Push reviews to redux
  dispatch(addedReviews({ reviews: normalizedReviews }));

  return null;
};

/** @description Edit a single review
 *  @param {IReviewToServer} data - all encompasing object
 *  @fires reviews#updatedReviews - update a specific review
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

/** @description Get review from server
 *  @param {IReviewRequestFromServer} data data object
 *  @fires reviews#addedReviews - add review to store
 *  @returns {Promise} Promise
 *    @resolves {NULL} null
 *  @reject {Error} error message
 */
export const getReview = (
  data: IReviewRequestFromServer
): MyThunkResult<Promise<null>> => async dispatch => {
  // Find review
  const review = await API.review.get(data);

  // Normalize reviews
  const { byReviewID, allReviewIDs } = Flatn.reviews({
    reviews: [review]
  });
  // Create obj to redux
  const normalizedReviews: IReviewsState = { byReviewID, allReviewIDs };
  // Push reviews to redux
  dispatch(addedReviews({ reviews: normalizedReviews }));

  return null;
};

/** @description Get review from server
 *  @param {String} slug - sauce slug to lookup
 *  @fires reviews#addedReviews - add review to store
 *  @returns {Promise} Promise
 *    @resolves {NULL} null
 *  @reject {Error} error message
 */
export const getReviewsBySlug = ({
  slug
}: {
  slug: string;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Find review
  const res = await API.reviews.getBySlug({ slug });

  // Normalize reviews
  const { byReviewID, allReviewIDs } = Flatn.reviews({
    reviews: res.data.reviews
  });

  // Create obj to redux
  const normalizedReviews: IReviewsState = { byReviewID, allReviewIDs };
  // Push reviews to redux
  dispatch(addedReviews({ reviews: normalizedReviews }));

  return null;
};
