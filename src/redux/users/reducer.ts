import { UsersActionTypes, IUserState, IUserAction } from "./types";
import { Reducer } from "redux";

const initialState: IUserState = {
  self: {},
  byDisplayName: {},
  allDisplayName: [""]
};

const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case UsersActionTypes.USER_LOGGED_IN:
      // Set user.self info
      return {
        ...state,
        self: { token: action.token, displayName: action.displayName }
      };
    case UsersActionTypes.USER_LOGGED_OUT:
      // remove all user.self stuff
      return { ...state, self: {} };
    // case UsersActionTypes.USER_UPDATED:
    //   return {
    //     ...state,
    //     email: action.email,
    //     name: action.name
    //   };

    default:
      return state;
  }
};

export default userReducer;
