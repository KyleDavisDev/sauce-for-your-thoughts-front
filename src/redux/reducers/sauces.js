export default function sauces(state = {}, action) {
  switch (action.type) {
    case "SAUCES_ADDED":
      // action.sauces === {sauce, sauce, sauce}
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.sauces.byId)
            : Object.assign({}, action.sauces.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? [
                ...state.allIds,
                ...action.sauces.allIds.filter(
                  x => state.allIds.indexOf(x) === -1
                )
              ]
            : [...action.sauces.allIds],
        query: {
          ...state.query,
          ...action.query
        }
      };

    case "SINGLE_SAUCE_ADDED":
      // action.sauce === {sauce}
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.sauce.byId)
            : Object.assign({}, action.sauce.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? [
                ...state.allIds,
                ...action.sauces.allIds.filter(
                  x => state.allIds.indexOf(x) === -1
                )
              ]
            : [...action.sauce.allIds]
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
