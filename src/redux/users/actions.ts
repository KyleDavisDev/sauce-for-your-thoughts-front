import { API } from "../../utils/api/API";
import { IRegisterUser, UsersActionTypes, ILoginUser } from "./types";
// import { store } from "../../components/App";

// export const addUsers = ({ users }) => ({
//   type: "USERS_ADDED",
//   users
// });

// action to og user in
export const userLoggedIn = ({
  token,
  displayName
}: {
  token: string;
  displayName: string;
}) => ({
  type: UsersActionTypes.USER_LOGGED_IN,
  token,
  displayName
});

// action to log user out
export const userLoggedOut = () => ({
  type: UsersActionTypes.USER_LOGGED_OUT
});

// export const gotUserInfo = ({ _id, email, name }) => ({
//   type: "USERS_SET_INFO",
//   _id,
//   email,
//   name
// });

/** @description update a specific user's DB info
 *  @param {Object} credentials - data container
 *    @param {Object} credentials.user - user container
 *      @param {String} credentials.user.token - unique user identifier
 *      @param {String} credentials.user.name - new name to update to
 *      @param {String} credentials.user.email - new email to update to
 *  @fires users#gotUserInfo - set user.self properties
 *  @fires flash#flashSuccess - show user success message
 *  @returns {Promise}
 *    @returns {NULL}
 */
// export const updateUser = credentials => dispatch =>
//   api.user.update(credentials).then(res => {
//     const { email, name } = res.user;
//     // update by setting again
//     dispatch(gotUserInfo({ email, name }));
//     const text = `Your name was saved as: ${name} and your email was saved as: ${email}.`;
//     dispatch(flashSuccess({ text }));
//     return res.user;
//   });

/** @description pass credentials to server to register user
 *  @param {IRegisterUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} token - unique user token
 *
 *  {String} token - unique user token
 *
 *  {String} displayName - unique user displayName
 *
 *  @reject {String} error message
 */
export const register = ({ credentials }: { credentials: IRegisterUser }) => (
  dispatch: any
): Promise<object> => {
  return API.user.register(credentials).then(res => {
    // Grab token and name
    const { token, name }: { token?: string; name?: string } = res.data.user;

    // If we can't find token, stop
    if (!token) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName }));

    return { token, displayName };
  });
};

/** @description pass credentials to server to log user in
 *  @param {ILoginUser} credentials - credentials object
 *  @fires user#userLoggedIn - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} token - unique user token
 *
 *  {String} token - unique user token
 *
 *  {String} displayName - unique user displayName
 *
 *  @reject {String} error message
 */
export const login = ({ credentials }: { credentials: ILoginUser }) => (
  dispatch: any
): Promise<object> => {
  return API.user.login(credentials).then(res => {
    // Grab token and name
    const { token, name }: { token?: string; name?: string } = res.data.user;

    // If we can't find token, stop
    if (!token) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName }));

    return { token, displayName };
  });
};

/** @description logs the user out by resetting redux store
 *  @fires auth#userLoggedOut - resets information in redux users.self
 *  @returns {NULL}
 */
export const logout = () => (dispatch: any) => {
  // remove users.self info
  dispatch(userLoggedOut());
};
