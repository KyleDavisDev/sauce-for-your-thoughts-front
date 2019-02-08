import { UsersActionTypes, IUserState, IUserAction } from "./types";
import { Reducer } from "redux";

const initialState: IUserState = {
  self: {},
  byId: {},
  allIds: [""]
};

const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case UsersActionTypes.USER_LOGGED_IN:
      return {
        ...state,
        self: { token: action.token, displayName: action.displayName }
      };
    // case UsersActionTypes.USER_GOT_INFO:
    //   return {
    //     ...state,
    //     email: action.email,
    //     name: action.name
    //   };
    // case UsersActionTypes.USER_UPDATED:
    //   return {
    //     ...state,
    //     email: action.email,
    //     name: action.name
    //   };
    // case UsersActionTypes.USER_LOGGED_OUT:
    //   return {};

    default:
      return state;
  }
};

export default userReducer;
