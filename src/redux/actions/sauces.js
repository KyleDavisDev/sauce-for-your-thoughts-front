import api from "../../api/api";
import { flattenSauces, flatChecker } from "./helper";
import { addReviews } from "./reviews";
import { addUsers } from "./users";

export const addedSauces = ({ sauces }) => ({
  type: "SAUCES_ADDED",
  sauces
});

export const updatedSaucesItems = ({ sauce }) => ({
  type: "UPDATED_SAUCES_ITEM",
  sauce
});

export const saucesByTagFound = ({ sauces }) => ({
  type: "SAUCES_BY_TAG_FOUND",
  sauces
});

export const cleanedUpSauces = () => ({
  type: "CLEANED_UP_SAUCES"
});

/** @description Add single sauce to array of sauces
 *  @param Object, sauce to be added to redux store
 *  @return Object, sauce and action type
 */
export const addedSingleSauce = ({ sauce }) => ({
  type: "SINGLE_SAUCE_ADDED",
  sauce
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
 *  @returns {NULL}
 */
export const addSauce = data => dispatch =>
  api.sauce.add(data).then(res => {
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

/** @description Grab all sauces available (will limit this to only set amount at a time in future)
 *  @param {Number} page - current page the user is on.
 *  @param {Number} limit - limits the number of sauces returned
 *  @return {NULL}
 */
export const getSauces = ({ page, limit }) => dispatch => {
  api.sauces.get({ page, limit }).then(res => {
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

export const cleanUpSauces = () => dispatch => {
  dispatch(cleanedUpSauces());
};

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
