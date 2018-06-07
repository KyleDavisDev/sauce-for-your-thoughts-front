export default function sauces(state = {}, action) {
  switch (action.type) {
    case "SAUCES_ADDED":
      // action.sauces === {sauce, sauce, sauce}
      return {
        ...state,
        byId: { ...state.byId, ...action.sauces.byId },
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? [
                ...state.allIds,
                ...action.sauces.allIds.filter(
                  x => state.allIds.indexOf(x) === -1
                )
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

    case "UPDATED_SAUCES_ITEM":
      // update single sauces item if sauces is already set
      return state
        ? state.map(sauce => {
            if (sauce._id === action.sauce._id) {
              action.sauce.author = sauce.author;
              return action.sauce;
            }
            return sauce;
          })
        : [];
    case "SAUCES_BY_TAG_FOUND":
      return action.sauces;

    // TODO: add sauce to .byIds and add id to .allIds
    case "SAUCE_FOUND":
      return {};
    case "CLEANED_UP_SAUCES":
      return [];
    default:
      return state;
  }
}
