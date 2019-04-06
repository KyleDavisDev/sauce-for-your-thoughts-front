// User shape
export interface IUser {
  _id?: number;
  reviews?: string[];
  created: string;
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
}

// Used for redux state
export interface IUserState {
  self: { token?: string; displayName?: string };
  byDisplayName?: { [key: string]: IUser };
  allDisplayName?: string[];
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

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
export const enum UsersActionTypes {
  USER_LOGGED_IN = "@@users/USER_LOGGED_IN",
  USER_GOT_INFO = "@@users/USER_GOT_INFO",
  USER_UPDATED = "@@users/USER_UPDATED",
  USER_LOGGED_OUT = "@@users/USER_LOGGED_OUT"
}
