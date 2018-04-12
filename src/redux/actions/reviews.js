import api from "../../api/api";

export const addReviews = ({ reviews }) => ({
  type: "REVIEWS_ADDED",
  reviews
});

/** @description add a single review to the DB
 *  @param {Object} data - all encompasing object
 *    @param {Object} data.user - holds user information
 *      @param {String} data.user.token - unique user identifier
 *    @param {Object} data.sauce - hold sauce information
 *      @param {String} data.sauce._id - unique suace identifier
 *    @param {Object} data.review - holds review information
 *      @param {String} data.review.text - user review to be saved
 *      @param {Number} data.review.rating - 0-10 value of the sauce
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const addReview = data => dispatch =>
  api.review.add(data).then(res => {
    // format review so reducer can understand it
    const review = {
      byId: {
        [res.data.review._id]: {
          _id: res.data.review._id,

          rating: res.data.review.rating,
          text: res.data.review.text,
          author: { _id: res.data.review.author },
          sauce: { _id: res.data.review.sauce }
        }
      },
      allIds: [res.data.review._id]
    };

    // add review to redux store
    dispatch(addReviews({ reviews: review }));
  });
