// User shape
export interface IUser {
  _id?: number;
  _addedToStore?: number; // Unix time for when added to redux
  reviews?: string[];
  created: number;
  displayName: string;
  email?: string;
  avatarURL?: string;
}

// Trimmed down for reference only
export interface IUserRef {
  _id?: number | string;
  displayName: string;
}

// Used for redux reducer
export interface IUserAction {
  type: string;
  token?: string;
  displayName?: string;
  avatarURL?: string;
  byDisplayName?: { [key: string]: IUser };
  allDisplayNames?: string[];
  oldDisplayName?: string;
  isAdmin?: boolean;
}

// Used for redux state
export interface IUserState {
  self?: {
    token: string;
    displayName: string;
    avatarURL: string;
    isAdmin: boolean;
  };
  byDisplayName?: { [key: string]: IUser };
  allDisplayNames?: string[];
}

// Register user
export interface IRegisterUser {
  user: {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  };
}

// Login user
export interface ILoginUser {
  user: {
    email: string;
    password: string;
  };
}

// Update user email
export interface IUserUpdateEmail {
  user: {
    token: string;
    email: string;
    confirmEmail: string;
    password: string;
  };
}

// Update user password
export interface IUserUpdatePassword {
  user: {
    token: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

// Update user displayname
export interface IUserUpdateDisplayName {
  user: {
    token: string;
    password: string;
    displayName: string;
    confirmDisplayName: string;
  };
}

// Update user avatar
export interface IUserUpdateAvatar {
  user: { token: string; password: string; avatarURL: string };
}

// Action strings
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_GOT_INFO = "USER_GOT_INFO";
export const USER_UPDATE_DISPLAYNAME = "USER_UPDATE_DISPLAYNAME";
export const USER_UPDATE_AVATARURL = "USER_UPDATE_AVATARURL";
export const USER_UPDATED = "USER_UPDATED";
export const USER_ADDED = "USER_ADDED";
export const USER_CLEARED = "USER_CLEARED";
