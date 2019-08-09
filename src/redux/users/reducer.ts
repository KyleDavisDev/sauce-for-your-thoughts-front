import {
  IUserState,
  IUserAction,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_ADDED,
  USER_CLEARED,
  USER_UPDATE_DISPLAYNAME
} from "./types";
import { Reducer } from "redux";

const initialState: IUserState = {
  byDisplayName: {},
  allDisplayNames: [""]
};

const userReducer: Reducer<IUserState> = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      // Grab values
      const { token, displayName, avatarURL } = action;

      // Make sure we have each value
      if (!token || !displayName || !avatarURL) return state;

      // Set user.self info
      return {
        ...state,
        self: {
          token,
          displayName,
          avatarURL
        }
      };
    }
    case USER_LOGGED_OUT: {
      // remove all user.self stuff
      return {
        ...state,
        self: undefined
      };
    }
    case USER_ADDED: {
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
    }
    case USER_CLEARED: {
      return initialState;
    }
    case USER_UPDATE_DISPLAYNAME: {
      // Grab variables from action.
      const { displayName, oldDisplayName } = action;
      // If cannot find then return immediately.
      if (!displayName || !oldDisplayName) return state;
      // If the same, return immediately
      if (displayName === oldDisplayName) return state;

      // Make sure we have full state.self
      if (!state.self) return state;
      // Make sure we have content in byDisplayName
      if (!state.byDisplayName) return state;

      // Update in self
      const self = { ...state.self, displayName };
      // remove old from array, push into array
      const allDisplayNames = state.allDisplayNames
        ? state.allDisplayNames
            .filter(name => {
              return name !== oldDisplayName;
            })
            .concat([displayName])
        : [displayName];
      // update key and property in obj
      const byDisplayName = {
        ...state.byDisplayName,
        [displayName]: state.byDisplayName[oldDisplayName]
      };
      delete byDisplayName[oldDisplayName];

      return { self, allDisplayNames, byDisplayName };
    }

    default:
      return state;
  }
};

export default userReducer;
