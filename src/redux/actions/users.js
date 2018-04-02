import api from "../../api/api";

export const addUsers = ({ users }) => ({
  type: "USERS_ADDED",
  users
});

export const gotHearts = ({ hearts }) => ({
  type: "GOT_HEARTS",
  hearts
});

export const toggledHeart = ({ sauce }) => ({
  type: "TOGGLED_HEART",
  sauce
});

/** @description Grab all sauces available (will limit this to only set amount at a time in future)
 *  @param {Object} user - API expects a specific format
 *    @param {String} user.token - JWT string
 *  @param {function} dispatch - dispatch action
 *  @return {NULL}
 */
export const getHearts = credentials => dispatch =>
  api.user.getHearts(credentials).then(res => {
    dispatch(gotHearts({ hearts: res.data.hearts }));
  });

/** @description add/remove sauce from user's array of hearted sauces
 *  @param {Object} data - API expects specific format
 *    @param {Object} user - user object
 *      @param {String} token - JWT string
 *    @param {Object} sauce - sauce object
 *      @param {String} _id - sauce identifier
 *  @returns {NULL}
 */
export const toggleHeart = data => dispatch =>
  api.user.toggleSauce(data).then(res => {
    dispatch(toggledHeart({ sauce: res.data.sauce }));
  });
