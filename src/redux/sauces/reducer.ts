import { Reducer } from "redux";
import { ISauces, IAction } from "./types";

const initialState: ISauces = {
  allIds: [],
  byId: {},
  total: 0,
  query: {}
};

const sauceReducer: Reducer<ISauces> = (
  state: ISauces = initialState,
  action: IAction
) => {
  switch (action.type) {
    case "SAUCES_ADDED":
      // Look for null cases first
      if (!action.sauces || !action.sauces.allIds || !action.query) {
        return state;
      }

      // Return new state.
      return {
        ...state,
        byId: { ...state.byId, ...action.sauces.byId },
        allIds:
          "allIds" in state && state.allIds !== null && state.allIds.length > 0
            ? [
                ...state.allIds,
                ...action.sauces.allIds.filter(x => {
                  return state.allIds.indexOf(x) === -1;
                })
              ]
            : [...action.sauces.allIds],
        query:
          action.query === null // If the query is null, leave as is, else concatinate
            ? state.query
            : {
                ...state.query,
                ...action.query
              },
        total: action.total || state.total
      };

    // Will come back to this
    // case "UPDATED_SAUCES_ITEM":
    //   // update single sauces item if sauces is already set
    //   return state
    //     ? state.map(sauce => {
    //         if (sauce._id === action.sauce._id) {
    //           action.sauce.author = sauce.author;
    //           return action.sauce;
    //         }
    //         return sauce;
    //       })
    //     : [];
    case "SAUCES_BY_TAG_FOUND":
      return action.sauces;

    // TODO: add sauce to .byIds and add id to .allIds
    case "SAUCE_FOUND":
      return {};

    default:
      return state;
  }
};

export default sauceReducer;
