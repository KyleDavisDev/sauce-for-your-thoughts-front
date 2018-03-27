import api from "../../api/api";
import { flattenSauces, flatChecker } from "./helper";

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

export const addSauce = data => dispatch => {
  return api.sauce.add(data).then(res => {
    dispatch(addedSingleSauce({ sauce: res.data.sauce }));
  });
};

/** @description Grab all sauces available (will limit this to only set amount at a time in future)
 *  @return {Object} response data
 */
export const getSauces = () => dispatch => {
  return api.sauces.get().then(res => {
    const { sauces, reviews, authors } = flattenSauces(res.data.sauces);

    //make sauces were flattened
    if (flatChecker(sauces)) {
      dispatch(addedSauces({ sauces }));
    }

    //make sure review were flattened
    if (flatChecker(reviews)) {
      dispatch(addReviews({ reviews }));
    }

    //make sure users were flattened
    if (flatChecker(authors)) {
      dispatch(addUsers({ users: authors }));
    }

    return res;
  });
};

export const updateSaucesItem = ({ sauce }) => dispatch => {
  dispatch(updatedSaucesItems({ sauce }));
  return;
};

export const getSaucesByTag = data => dispatch => {
  return api.sauces.getSaucesByTag(data).then(res => {
    dispatch(saucesByTagFound({ sauces: res.sauces }));
    return res;
  });
};

export const getSaucesBySearch = searchValue => dispatch => {
  return api.sauces.search(searchValue).then(res => {
    //dipatch event here in future (?)
    return res;
  });
};

export const cleanUpSauces = () => dispatch => {
  dispatch(cleanedUpSauces());
};
