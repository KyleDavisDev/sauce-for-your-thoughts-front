import api from "../../utils/api/api";
import { IReviewsAction, ReviewsActionTypes, IReview } from "./types";

/** @description add review(s) to store
 *  @param {Object} reviews - array of review objects
 *  @param {Object} reviews.byId - object with nested review objects
 *  @param {String[]} reviews.allIds - array of review key strings
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
 *    @param {String} data.review.taste - taste obj
 *      @param {String} data.review.taste.txt - description of taste
 *      @param {Number} data.review.taste.rating - 1-5 rating
 *    @param {String} data.review.heat - heat obj
 *      @param {String} data.review.heat.txt - description of heat
 *      @param {Number} data.review.heat.rating - 1-5 rating
 *    @param {String} data.review.aroma - aroma obj
 *      @param {String} data.review.aroma.txt - description of aroma
 *      @param {Number} data.review.aroma.rating - 1-5 rating
 *    @param {String} data.review.overall - overall obj
 *      @param {String} data.review.overall.txt - description of overall
 *      @param {Number} data.review.overall.rating - 1-5 rating
 *    @param {String} data.review.label - label obj
 *      @param {String} data.review.label.txt - description of label
 *      @param {Number} data.review.label.rating - 1-5 rating
 *    @param {String?} data.review.note - who made the sauce
 *  @fires reviews#addedReview - add review to store
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const addReview = ({
  data
}: {
  data: { user: { token: string }; sauce: { token: string }; review: IReview };
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
