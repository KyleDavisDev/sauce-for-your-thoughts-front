import api from "../../api/api";

export const addUsers = ({ users }) => ({
  type: "USERS_ADDED",
  users
});

export const gotHearts = ({ hearts }) => ({
  type: "GOT_HEARTS",
  hearts
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
