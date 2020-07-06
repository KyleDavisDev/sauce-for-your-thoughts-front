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
  IUserUpdateAvatar,
  USER_UPDATE_DISPLAYNAME,
  USER_UPDATE_AVATARURL
} from "./types";
import { MyThunkResult } from "../configureStore";
import Auth from "../../utils/Auth/Auth";
import { updatedDisplayName as saucesUpdatedDisplayName } from "../sauces/actions";
import { updatedDisplayName as reviewsUpdatedDisplayName } from "../reviews/actions";

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
 *  @param {Boolean} isAdmin - is user an admin?
 *  @return {IUserAction} sauce and action type
 */
export const userLoggedIn = ({
  token,
  displayName,
  avatarURL,
  isAdmin
}: {
  token: string;
  displayName: string;
  avatarURL: string;
  isAdmin: boolean;
}): IUserAction => ({
  type: USER_LOGGED_IN,
  token,
  displayName,
  avatarURL,
  isAdmin
});

/** @description Update a single user's display name wherever it is found
 *  @param {String} displayName - new person's name
 *  @param {String} oldDisplayName - old person's name
 *  @return {IUserAction} sauce and action type
 */
export const updatedDisplayName = ({
  oldDisplayName,
  displayName
}: {
  oldDisplayName: string;
  displayName: string;
}): IUserAction => ({
  type: USER_UPDATE_DISPLAYNAME,
  oldDisplayName,
  displayName
});

/** @description Update a single user's avatar wherever found
 *  @param {String} displayName - new person's name
 *  @param {String} avatarURL - new avatarURL
 *  @return {IUserAction} sauce and action type
 */
export const updatedAvatarURL = ({
  displayName,
  avatarURL
}: {
  displayName: string;
  avatarURL: string;
}): IUserAction => ({
  type: USER_UPDATE_AVATARURL,
  avatarURL,
  displayName
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
      avatarURL,
      isAdmin = false
    }: {
      token?: string;
      name?: string;
      avatarURL?: string;
      isAdmin: boolean;
    } = res.data.user;

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
    dispatch(userLoggedIn({ token, displayName, avatarURL, isAdmin }));

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
    // Grab return vals
    const {
      token,
      displayName,
      avatarURL,
      isAdmin = false
    }: {
      token?: string;
      displayName?: string;
      avatarURL?: string;
      isAdmin: boolean;
    } = res.data.user;

    // If we can't find token, stop
    if (!token || !avatarURL || !displayName) {
      throw new Error("Unable to verify your login. Please try again.");
    }

    // Set user to be remembered
    Auth.authenticateUser({
      token,
      displayName,
      avatarURL,
      isAdmin
    });

    // Dispatch user login
    dispatch(userLoggedIn({ token, displayName, avatarURL, isAdmin }));

    return { token, displayName };
  });
};

/** @description logs the user out by calliing API to null the cookies
 *  @fires auth#userLoggedOut - resets information in redux users.self
 *  @returns {NULL}
 */
export const logout = () => async (dispatch: any) => {
  await API.user.logout();

  // remove users.self info
  dispatch(userLoggedOut());
};

/** @description Update a user's email
 *  @param {IUserUpdateEmail} data - container for user information
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
 *  @param {string} data.user.password - original password
 *  @param {string} data.user.displayName - new user display name
 *  @param {string} data.user.confirmDisplayName - confirm new display name
 *  @param {string} oldDisplayName - user's old display name
 *  @fires users#updatedDisplayName - update user from user store
 *  @fires sauces#updatedDisplayName - update user in sauces
 *  @fires reviews#updatedDisplayName - update user in reviews
 *  @return {Promise} Promise
 *
 *  @reject {IErrReturn} error object
 */
export const updateDisplayName = ({
  data,
  oldDisplayName
}: {
  data: IUserUpdateDisplayName;
  oldDisplayName: string;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Call API
  await API.user.updateDisplayName({ data });

  // Update user in users section
  dispatch(
    updatedDisplayName({
      oldDisplayName,
      displayName: data.user.displayName
    })
  );
  // Update user in sauces
  dispatch(
    saucesUpdatedDisplayName({
      oldDisplayName,
      displayName: data.user.displayName
    })
  );
  // Update user in reviews
  dispatch(
    reviewsUpdatedDisplayName({
      oldDisplayName,
      displayName: data.user.displayName
    })
  );

  // Update displayName in local storage
  Auth.updateDisplayName(data.user.displayName);

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
  data,
  displayName
}: {
  data: IUserUpdateAvatar;
  displayName: string;
}): MyThunkResult<Promise<null>> => async dispatch => {
  // Call API
  await API.user.updateAvatar({ data });

  // Update user avatar
  dispatch(updatedAvatarURL({ displayName, avatarURL: data.user.avatarURL }));

  // Update displayName in local storage
  Auth.updateAvatar(data.user.avatarURL);

  // // Dispatch user login
  // dispatch(
  //   userLoggedIn({
  //     token,
  //     displayName
  //   })
  // );

  return null;
};
