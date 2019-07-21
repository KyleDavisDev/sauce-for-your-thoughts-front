import {
  IUserState,
  IUserAction,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_ADDED
} from "./types";
import { Reducer } from "redux";

const initialState: IUserState = {
  self: {},
  byDisplayName: {},
  allDisplayNames: [""]
};

const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case USER_LOGGED_IN:
      // Set user.self info
      return {
        ...state,
        self: { token: action.token, displayName: action.displayName }
      };
    case USER_LOGGED_OUT:
      // remove all user.self stuff
      return { ...state, self: {} };
    case USER_ADDED:
      // This will concat onto dictionary and overwrite an old key if new appears
      const byDisplayName = { ...state.byDisplayName, ...action.byDisplayName };

      // Make sure we don't have undefined here.
      const stateAllDisplayNames = state.allDisplayNames || [];
      const actionAllDisplayNames = action.allDisplayNames || [];
      const allDisplayNames = [
        ...stateAllDisplayNames, // old DisplayNames
        ...actionAllDisplayNames.filter(
          x => stateAllDisplayNames.indexOf(x) === -1 // concat only DisplayName that are not already in the array
        )
      ];
      return { ...state, byDisplayName, allDisplayNames };
    default:
      return state;
  }
};

export default userReducer;
