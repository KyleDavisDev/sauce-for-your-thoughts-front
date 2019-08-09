import { API } from "../../utils/api/API";
import {
  IRegisterUser,
  ILoginUser,
  IUserState,
  IUserAction,
  USER_ADDED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_CLEARED,
  IUserUpdateEmail,
  IUserUpdatePassword,
  IUserUpdateDisplayName,
  IUserUpdateAvatar
} from "./types";
import { MyThunkResult } from "../configureStore";
import Auth from "../../utils/Auth/Auth";
import Err from "../../utils/Err/Err";
import { saucesCleared } from "../sauces/actions";
import { reviewsCleared } from "../reviews/actions";

export const addUsers = ({ user }: { user: IUserState }): IUserAction => {
  return {
    type: USER_ADDED,
    byDisplayName: user.byDisplayName,
    allDisplayNames: user.allDisplayNames
  };
};

/** @description Save user data to self since they are logged in now
 *  @param {String} token - unique user string
 *  @param {String} displayName - unique person name
 *  @param {String} avatarURL - path to person avatar
 *  @return {IUserAction} sauce and action type
 */
export const userLoggedIn = ({
  token,
  displayName,
  avatarURL
}: {
  token: string;
  displayName: string;
  avatarURL: string;
}): IUserAction => ({
  type: USER_LOGGED_IN,
  token,
  displayName,
  avatarURL
});

/** @description Reset users in store
 *  @return {IUserAction} sauce and action type
 */
export const userCleared = (): IUserAction => ({
  type: USER_CLEARED
});

// action to log user out
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

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
    const {
      token,
      name,
      avatarURL
    }: { token?: string; name?: string; avatarURL?: string } = res.data.user;

    // If we can't find token, stop
    if (!token || !avatarURL) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName, avatarURL }));

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
    const {
      token,
      name,
      avatarURL
    }: { token?: string; name?: string; avatarURL?: string } = res.data.user;

    // If we can't find token, stop
    if (!token || !avatarURL) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // if name is undefined or empty string  we should look in
    // the return object to see if displayName was sent instead or set to "Me"
    const displayName =
      name === undefined || name.length === 0
        ? res.data.user.displayName || "Me"
        : name;

    // Set user to be remembered
    Auth.authenticateUser({
      token,
      displayName,
      avatarURL
    });

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName, avatarURL }));

    return { token, displayName };
  });
};

/** @description logs the user out by resetting redux store
 *  @fires auth#userLoggedOut - resets information in redux users.self
 *  @returns {NULL}
 */
export const logout = () => (dispatch: any) => {
  // remove token from storage
  Auth.deauthenticateUser();

  // remove users.self info
  dispatch(userLoggedOut());
};

/** @description pass credentials to server to log user in
 *  @param {Object} data - user information container
 *  @param {string} data.user.token - unique user string
 *  @param {string?} data.displayName - person we are interested in
 *  @return {Promise} Promise
 *  @resolves {Null}
 *
 *  @reject {String} error message
 */
export const getInfo = ({
  data
}: {
  data: { user: { token: string }; displayName: string };
}): MyThunkResult<Promise<null>> => async dispatch => {
  await API.user.getInfo({ data });

  return null;
};

/** @description Update a user's email
 *  @param {IUserUpdateEmail} data - container for user information
 *  @param {string} data.user.token - user token
 *  @param {string} data.user.email - new email address
 *  @param {string} data.user.confirmEmail - confirmed email adress
 *  @param {string} data.user.password - user password
 *  @fires user#userUpdateEmail - set self.token in redux store
 *  @return {Promise} Promise
 *  @resolves {Object} res.data - data container
 *
 *  @reject {String} error message
 */
export const updateEmail = ({
  data
}: {
  data: IUserUpdateEmail;
}): MyThunkResult<Promise<null>> => async dispatch => {
  await API.user.updateEmail({ data });

  return null;
};

/** @description Call API to update user's password
 *  @param {IUserUpdateEmail} data - container for user information
 *  @param {string} data.user.token - user token
 *  @param {string} data.user.password - original password
 *  @param {string} data.user.newPassword - new user password
 *  @param {string} data.user.confirmNewPassword - confirm new user password
 *  @return {Promise} Promise
 *  @resolves {NULL} token - unique user token
 *
 *  @reject {IErrReturn} error object
 */
export const updatePassword = ({
  data
}: {
  data: IUserUpdatePassword;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Call API
  await API.user.updatePassword({ data });

  return null;
};

/** @description Call API to update user's display name
 *  @param {IUserUpdateDisplayName} data - container for user information
 *  @param {string} data.user.token - user token
 *  @param {string} data.user.password - original password
 *  @param {string} data.user.displayName - new user display name
 *  @param {string} data.user.confirmDisplayName - confirm new display name
 *  @fires users#userCleared - remove user from user store
 *  @fires sauces#saucesCleared - remove sauces
 *  @fires reviews#reviewsCleared - remove reviews
 *  @return {Promise} Promise
 *  @resolves {NULL} token - unique user token
 *
 *  @reject {IErrReturn} error object
 */
export const updateDisplayName = ({
  data
}: {
  data: IUserUpdateDisplayName;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Call API
  const res = await API.user.updateDisplayName({ data });

  // const displayName =
  // If all is good, we need to update displayName in 4 places (1)Sauces, (1)Reviews, (2)Users
  // OR
  // Wipe those and let them repopulate with the updated information (we choose this one for now)
  dispatch(userCleared()); // Users cleared -- clear 2 references
  dispatch(saucesCleared()); // Sauces cleared -- clear 1 reference
  dispatch(reviewsCleared()); // Reviews cleared -- clear 1 refenence

  // // Update displayName in local storage
  // Auth.updateDisplayName(displayName);

  // // Dispatch user login
  // dispatch(
  //   userLoggedIn({
  //     token,
  //     displayName,
  //     avatarURL
  //   })
  // );

  return null;
};

/** @description Call API to update user's display name
 *  @param {IUserUpdateAvatar} data - container for user information
 *  @param {string} data.user.token - user token
 *  @param {string} data.user.password - original password
 *  @param {string} data.user.avatarURL - new user avatar url
 *  @fires users#userCleared - remove users from redux store
 *  @return {Promise} Promise
 *  @resolves {NULL} token - unique user token
 *
 *  @reject {IErrReturn} error object
 */
export const updateAvatar = ({
  data
}: {
  data: IUserUpdateAvatar;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Call API
  const res = await API.user.updateAvatar({ data });

  const { token, displayName } = res.data.user;

  // Update displayName in local storage
  Auth.updateDisplayName(displayName);

  // Dispatch user login
  dispatch(
    userLoggedIn({
      token,
      displayName
    })
  );

  return null;
};
