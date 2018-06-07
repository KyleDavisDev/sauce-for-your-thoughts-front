import api from "../../utils/api/api";
import { flattenSauces, flatChecker } from "./helper";
import { addedReviews } from "./reviews";
import { addUsers } from "./users";

/** @description Add sauce(s) to array of sauces
 *  @param {Object[]} sauces[] - array of sauce objects
 *  @param {String?} query - query used to get sauces
 *  @param {Number?} total - total number of sauces in store
 *  @return Object, sauce and action type
 */
export const addedSauces = ({ sauces, query = null, total = null }) => ({
  type: "SAUCES_ADDED",
  sauces,
  query,
  total
});

export const updatedSaucesItems = ({ sauce }) => ({
  type: "UPDATED_SAUCES_ITEM",
  sauce
});

export const saucesByTagFound = ({ sauces }) => ({
  type: "SAUCES_BY_TAG_FOUND",
  sauces
});

/** @description Action emitter for when a single sauce is found
 *  @param Object, sauce related information
 *  @returns Object, has sauce info and action type
 */
export const sauceFound = ({ sauce }) => ({
  type: "SAUCE_FOUND",
  sauce
});

/** @description Add sauce to DB
 *  @param {FormData} data - Form Data that has been JSONified
 *    @param {Object} data.user - author of the sauce
 *      @param {String} data.user.token - unique string
 *    @param {Object} data.sauce - sauce object
 *      @param {String} data.sauce.name - name of the sauce
 *      @param {String} data.sauce.description - description of sauce
 *      @param {String[]} data.sauce.tags[] - user selected tags to catagorize sauce
 *    @param {Object} review - user review object
 *      @param {String} text - user's review of sauce
 *      @param {Number} rating - 0-10 value
 *    @param {Image} photo - actual photo to upload
 *      @param {String} photo.name - name of the photo
 *  @returns {Promise}
 *    @returns {Object} Response object
 */
export const addSauce = data => dispatch =>
  api.sauce.add(data).then(res => {
    // flatten resposne
    const { sauces, authors } = flattenSauces(res.data.sauces);

    // confirm that sauces were flattened
    if (flatChecker(sauces)) {
      dispatch(addedSauces({ sauces }));
    }

    // confirm that sure users were flattened
    if (flatChecker(authors)) {
      dispatch(addUsers({ users: authors }));
    }

    return res;
  });

/** @description Grab all sauces available (will limit this to only set amount at a time in future)
 *  @param {String?} query - optional query string to search for
 *  @return {NULL}
 */
export const getSauces = ({ query }) => dispatch => {
  api.sauces.get({ query }).then(res => {
    // flatten data
    const { sauces, reviews, authors } = flattenSauces(res.data.sauces);

    // construct just-searched query
    const sauceQuery = { [query]: { sauces: sauces.allIds } };

    // get total from response
    const total = res.data.total || 6;

    // make sauces were flattened
    if (flatChecker(sauces)) {
      dispatch(addedSauces({ sauces, query: sauceQuery, total }));
    }

    // make sure review were flattened
    if (flatChecker(reviews)) {
      dispatch(addedReviews({ reviews }));
    }

    // make sure users were flattened
    if (flatChecker(authors)) {
      dispatch(addUsers({ users: authors }));
    }

    return res;
  });
};

export const updateSaucesItem = ({ sauce }) => dispatch => {
  dispatch(updatedSaucesItems({ sauce }));
};

export const getSaucesByTag = data => dispatch =>
  api.sauces.getSaucesByTag(data).then(res => {
    dispatch(saucesByTagFound({ sauces: res.sauces }));
    return res;
  });

export const getSaucesBySearch = searchValue => dispatch =>
  api.sauces.search(searchValue).then(
    res =>
      // dipatch event here in future (?)
      res
  );

/** @description grab single sauce related to slug
 *  @param {String} slug - keyword to lookup
 *  @returns {NULL}
 */
export const getSauceBySlug = slug => dispatch =>
  api.sauce.getBySlug(slug).then(res => {
    // flatten response obj
    const { sauces, reviews, authors } = flattenSauces(res.data.sauces);

    // make sauces were flattened
    if (flatChecker(sauces)) {
      dispatch(addedSauces({ sauces }));
    }

    // make sure review were flattened
    if (flatChecker(reviews)) {
      dispatch(addReviews({ reviews }));
    }

    // make sure users were flattened
    if (flatChecker(authors)) {
      dispatch(addUsers({ users: authors }));
    }
  });
