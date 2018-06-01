export default function sauce(state = {}, action) {
  switch (action.type) {
    /** @description Expects action.reviews.allIds[] and action.reviews.byID{} */
    case "REVIEW_ADDED":
      console.log(state);
      // construct return object
      return {
        byId: { ...state.byId, ...action.review.byId }, // concat new review to old

        allIds: [
          ...state.allIds, // old ids
          ...action.review.allIds.filter(
            x => state.allIds.indexOf(x) === -1 // concat only id that are not already in the array
          )
        ]
      };

    default:
      return state;
  }
}
