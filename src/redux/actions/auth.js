import Checker from "../../utils/checker/Checker";
import api from "../../utils/api/api";
import Auth from "../../Helper/Auth/Auth";
import { flashSuccess } from "./flash";

export const userLoggedIn = ({ token }) => ({
  type: "USER_LOGGED_IN",
  token
});

export const userLoggedOut = () => ({
  type: "USER_LOGGED_OUT"
});

export const userRegistered = () => ({
  type: "USER_REGISTERED",
  text: "Thank you for registering! You are now logged in."
});

/** @description pass credentials to server to log user in
 *  @param {Object} credentials - all encompassing object
 *    @param {Object} credentials.user - user container
 *      @param {String} credentials.user.email - user email (used for logging in)
 *      @param {String} credentials.user.password - password for account
 *  @fires auth#userLoggedIn - set self.token in redux store
 *  @fires flash#flashSuccess - prompt success message for user
 * @return {Promise}
 *    @return {NULL}
 */
export const login = credentials => dispatch =>
  api.user.login(credentials).then(res => {
    const { token } = res.data.user;
    // save token to local storage and set timestamp
    Auth.authenticateUser(token);

    // save token to user in store
    dispatch(userLoggedIn({ token }));

    // dispatch successfull flash
    dispatch(flashSuccess({ text: "Successfully logged in. Thank you!" }));
  });

/** @description logs the user out by resetting redux store
 *  @fires auth#userLoggedOut - resets information in redux users.self
 *  @returns {NULL}
 */
export const logout = () => dispatch => {
  // remove token and dispatch action
  Auth.deauthenticateUser();
  dispatch(userLoggedOut());
};

/** @description pass credentials to server to register user
 *  @param {Object} credentials - all encompassing object
 *    @param {Object} credentials.user - user container
 *      @param {String} credentials.user.name - user's name
 *      @param {String} credentials.user.email - user email (used for logging in)
 *      @param {String} credentials.user.password - password for account
 *      @param {String} credentials.user.confirmPassword - password that the user typed in for the second time
 *  @fires auth#userLoggedIn - set self.token in redux store
 *  @fires flash#flashSuccess - prompt success message for user
 *  @return {Promise}
 *    @return {NULL}
 */
export const register = credentials => dispatch =>
  api.user.register(credentials).then(res => {
    const { token } = res.data.user;
    Auth.authenticateUser({ token });
    dispatch(userLoggedIn({ token }));
    dispatch(flashSuccess({ text: "Successfully logged in. Thank you!" }));
  });

/** @description pass token to server to confirm that token is legit
 *  @param {Object} credentials - credentials container
 *    @param {Object} credentials.user - user container
 *      @param {String} credentials.user.token - unique token string to check
 *  @fires auth#userLoggedIn - sets self.token in redux store
 *  @fires flash#flashSuccess - prompt success logged in message
 *  @returns {NULL}
 */
export const isLoggedIn = credentials => dispatch =>
  api.user.isLoggedIn(credentials).then(res => {
    // token is good if we are here
    dispatch(userLoggedIn({ token: credentials.user.token }));
    dispatch(
      flashSuccess({ text: "Restored your login from last time. Thank you!" })
    );
  });
