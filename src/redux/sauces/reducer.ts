import { Reducer } from "redux";
import { ISaucesState, SaucesActionTypes, ISaucesAction } from "./types";

const initialState: ISaucesState = {
  byId: {},
  allIds: [],
  query: {},
  total: 0
};

const sauceReducer: Reducer<ISaucesState> = (
  state: ISaucesState = initialState,
  action: ISaucesAction
): ISaucesState => {
  switch (action.type) {
    case SaucesActionTypes.SAUCES_ADDED:
      // Look for null cases first
      if (!action.allIds || !action.query) {
        return state;
      }

      // This will create an array of unique ID's only.
      // This is O(n^2), maybe optimize later?
      const uniqueIDs: number[] = [
        ...state.allIds,
        ...action.allIds.filter((id: number) => {
          return state.allIds.indexOf(id) === 0; // indexOf === 0 if it does not find 'id' in 'state.allIds'
        })
      ];

      // Return new state.
      return {
        ...state,
        byId: { ...state.byId, ...action.byId },
        allIds: uniqueIDs,
        query: { ...state.query, ...action.query },
        total: action.total || state.total
      };

    case SaucesActionTypes.UPDATE_SAUCE:
      if (!action.allIds) return state;
      // update single sauces item if sauces is already set
      return {
        ...state,
        byId: { ...state.byId, ...action.byId },
        allIds: [...state.allIds, ...action.allIds]
      };
    case SaucesActionTypes.SAUCES_BY_TAG_FOUND:
      return state; // Will come back to this

    // TODO: add sauce to .byIds and add id to .allIds
    case SaucesActionTypes.SAUCE_FOUND:
      return state; // Will come back to this

    default:
      return state;
  }
};

export default sauceReducer;
