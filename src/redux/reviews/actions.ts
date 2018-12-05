import api from "../../utils/api/api";
import { IReviewsAction, ReviewsActionTypes, IReview } from "./types";

/** @description add review(s) to store
 *  @param {number[]} allIds - array of review objects
 *  @param {IReview} byId - object with nested review objects
 */
export const addedReviews = ({
  allIds,
  byId
}: {
  allIds: number[];
  byId: { [key: string]: IReview };
}): IReviewsAction => ({
  type: ReviewsActionTypes.REVIEWS_ADDED,
  allIds,
  byId
});

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
}) => (dispatch: any) =>
  api.review.add(data).then(res => {
    // format review so reducer can understand it
    const byId: { [key: string]: IReview } = {
      [res.data.review._id]: res.data.review
    };
    const allIds: number[] = [res.data.review._id];

    // add review to redux store
    dispatch(addedReviews({ byId, allIds }));
  });
