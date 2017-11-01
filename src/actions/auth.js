import Checker from "../helper/Checker/Checker";
import api from "../api/api";

export const userLoggedIn = user => ({
  type: "USER_LOGGED_IN",
  user,
  text: "Successfully logged in. Thank you!"
});

export const login = credentials => dispatch => {
  return api.user.login(credentials).then(user => {
    dispatch(userLoggedIn(user));
  });
};
