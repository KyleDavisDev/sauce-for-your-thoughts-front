import { Reducer } from "redux";
import {
  ISaucesState,
  SAUCES_ADDED,
  SAUCE_UPDATE,
  SAUCES_REMOVED,
  SAUCES_BY_TAG_FOUND,
  SAUCE_FOUND,
  ISaucesReturnAction
} from "./types";

const initialState: ISaucesState = {
  bySlug: {},
  allSlugs: [],
  query: {},
  total: 0,
  saucesWithNewestReviews: [],
  newest: [],
  featured: []
};

const sauceReducer: Reducer<ISaucesState> = (
  state: ISaucesState = initialState,
  action: ISaucesReturnAction
): ISaucesState => {
  switch (action.type) {
    case SAUCES_ADDED:
      // Make sure we are not using undefined objects
      const stateBySlug = state.bySlug || {};
      const actionBySlug = action.bySlug || {};
      // Will replace state with new action ones unless
      // state entry has _full === true and action entry has _full === false
      Object.keys(actionBySlug).map(slug => {
        // if state already contains slug, we need to compare _full
        if (stateBySlug[slug]) {
          // If new one is full, we want this record since it will be newest
          if (actionBySlug[slug]._full) {
            return;
          }

          // If state has _full, we will go with this since it is more full
          if (stateBySlug[slug]._full) {
            actionBySlug[slug] = stateBySlug[slug];
            return;
          }
        }

        // Return
        return;
      });

      const bySlug = {
        ...stateBySlug,
        ...actionBySlug
      };

      // Make sure we aren't using undefined arrays
      const stateAllSlugs = state.allSlugs || [];
      const actionAllSlugs = action.allSlugs || [];
      // This will create an array of unique ID's only.
      const allSlugs: string[] = [
        ...stateAllSlugs,
        ...actionAllSlugs.filter((slug: string) => {
          return stateAllSlugs.indexOf(slug) === -1; // indexOf === 0 if it does not find 'Slug' in 'state.allIds'
        })
      ];

      // Replace old list with new one if available.
      const saucesWithNewestReviews = action.saucesWithNewestReviews && [
        ...action.saucesWithNewestReviews
      ];

      // Return new state.
      return {
        ...state,
        bySlug,
        allSlugs,
        query: { ...state.query, ...action.query },
        total: action.total || state.total,
        saucesWithNewestReviews,
        newest: action.newest || state.newest,
        featured: action.featured || state.featured
      };

    case SAUCE_UPDATE:
      if (!action.allSlugs) return state;
      // update single sauces item if sauces is already set
      return {
        ...state,
        bySlug: { ...state.bySlug, ...action.bySlug },
        allSlugs: [...state.allSlugs, ...action.allSlugs]
      };
    case SAUCES_REMOVED:
      // Make sure we have sauces to remove
      const actionAllSlugs2 = action.allSlugs;
      if (!actionAllSlugs2) return state;

      // Make sure we have suaces currently in store
      if (!state.allSlugs) return state;

      // Find difference between the two arrays.
      // Keep elements in state.allSlugs that are not in action.allSlugs
      const allSlugs2 = state.allSlugs.filter((slug: string) => {
        return actionAllSlugs2.indexOf(slug) === -1;
      });

      console.log(allSlugs2);

      return {
        ...state,
        allSlugs: allSlugs2
      };

    case SAUCES_BY_TAG_FOUND:
      return state; // Will come back to this

    // TODO: add sauce to .byIds and add id to .allIds
    case SAUCE_FOUND:
      return state; // Will come back to this

    default:
      return state;
  }
};

export default sauceReducer;
