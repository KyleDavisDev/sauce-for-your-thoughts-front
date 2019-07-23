// User shape
export interface IUser {
  _id?: number;
  _addedToStore?: number; // Unix time for when added to redux
  reviews?: string[];
  created: number;
  displayName: string;
  email?: string;
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
  byDisplayName?: { [key: string]: IUser };
  allDisplayNames?: string[];
}

// Used for redux state
export interface IUserState {
  self?: { token?: string; displayName?: string };
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

// Action strings
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_GOT_INFO = "USER_GOT_INFO";
export const USER_UPDATED = "USER_UPDATED";
export const USER_ADDED = "USER_ADDED";
