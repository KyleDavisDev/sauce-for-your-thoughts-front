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

export const gotUserInfo = ({ _id, email, name }) => ({
  type: "USERS_SET_INFO",
  _id,
  email,
  name
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

// TODO: Add description comments
export const updateUser = credentials => dispatch =>
  api.user.update(credentials).then(res => {
    const { email, name } = res.user;
    dispatch(userUpdated({ email, name }));
    const text = `Your name was saved as: ${name} and your email was saved as: ${email}.`;
    dispatch(flashSuccess({ text }));
    return res.user;
  });

/** @description gets basic information on a specifc user
 *  @param {Object} credentials - container
 *  @param {Object} credentials.user - user information container
 *    @param {String} credentials.user.token - unique user identifier
 *  @fires users#gotUserInfo - set user.self properties
 *  @returns {Promise}
 *    @returns {NULL}
 */
export const getInfo = credentials => dispatch =>
  api.user.getInfo(credentials).then(res => {
    const { _id, email, name } = res.data.user;
    dispatch(gotUserInfo({ _id, email, name }));
  });
