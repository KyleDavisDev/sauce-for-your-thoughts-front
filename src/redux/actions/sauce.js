import api from "../../utils/api/api";
import { flashSuccess } from "./flash";
import { addedSingleSauce, updateSaucesItem } from "./sauces";
import { addReviews } from "./reviews";
import { addUsers } from "./users";
import { flattenSauces } from "./helper";

// Not sure what I want to do with this yet...
export const sauceAdded = () => ({
  type: "SAUCE_ADDED"
});

export const sauceUpdated = () => ({
  type: "SAUCE_UPDATED"
});

// clear sauce from redux store
export const cleanedUpSauce = () => ({
  type: "CLEANED_UP_SAUCE"
});

/** @description Get relevant sauce information from sauce id. Dispatches redux action emitter.
 *  @param Object, pass to API class
 *  @returns Promise
 *  @returns Object, sauce
 */
export const getSauceById = data => dispatch =>
  api.sauce.getById(data).then(res => {
    const { sauces, reviews, authors } = flattenSauces([res.data]);
    dispatch(addedSingleSauce({ sauce: sauces }));
    dispatch(addReviews({ reviews }));
    dispatch(addUsers({ users: authors }));
    return res;
  });

export const updateSauce = data => dispatch =>
  api.sauce.update(data).then(res => {
    // remove sauce from redux
    dispatch(sauceUpdated());
    // update sauce in redux sauces array
    dispatch(updateSaucesItem({ sauce: res.sauce }));
    return res;
  });

export const cleanUpSauce = () => dispatch => {
  dispatch(cleanedUpSauce());
};
