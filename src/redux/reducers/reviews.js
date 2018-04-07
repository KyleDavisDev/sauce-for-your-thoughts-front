export default function sauce(state = {}, action) {
  switch (action.type) {
    /** @description Expects action.reviews.allIds[] and action.reviews.byID{} */
    case "REVIEWS_ADDED":
      // construct return object
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0 // sanity check
            ? { ...state.byId, ...action.reviews.byId } // concat new reviews to old
            : { ...action.reviews.byId }, // set new reviews to be entire object
        allIds:
          "allIds" in state && state.allIds.length > 0 // sanity check
            ? [
                ...state.allIds, // old ids
                ...action.reviews.allIds.filter(
                  x => state.allIds.indexOf(x) === -1 // concat only id that are not already in the array
                )
              ]
            : [...action.reviews.allIds] // set new reviews to be entire array
      };

    default:
      return state;
  }
}
