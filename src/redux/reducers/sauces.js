export default function sauces(state = [], action) {
  switch (action.type) {
    case "SAUCES_FOUND":
      return action.sauces;
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
    case "SAUCE_HEARTED":
      //update single sauce
      return state
        ? state.map(sauce => {
            if (sauce._id === action.sauce._id) {
              sauce.heart = true;
            }
            return sauce;
          })
        : [];
    case "SAUCE_UNHEARTED":
      //update single sauce
      return state
        ? state.map(sauce => {
            if (sauce._id === action.sauce._id) {
              sauce.heart = false;
            }
            return sauce;
          })
        : [];
    default:
      return state;
  }
}
