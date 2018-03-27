export default function sauces(state = {}, action) {
  switch (action.type) {
    case "SAUCES_ADDED":
      //action.sauces === {sauce, sauce, sauce}
      return action.sauces;

    case "SINGLE_SAUCE_ADDED":
      // action.sauce === {sauce}

      //construct return object
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.sauce.byId)
            : Object.assign({}, action.sauce.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? state.allIds.concat(action.sauce.allIds)
            : [].concat(action.sauce.allIds)
      };

    case "UPDATED_SAUCES_ITEM":
      //update single sauces item if sauces is already set
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
    case "CLEANED_UP_SAUCES":
      return [];
    default:
      return state;
  }
}
