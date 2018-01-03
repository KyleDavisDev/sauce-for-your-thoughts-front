export default function sauces(state = [], action) {
  switch (action.type) {
    case "STORES_GOT":
      return action.sauces;
    case "UPDATED_STORES_ITEM":
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
    case "STORES_BY_TAG_GOT":
      return action.sauces;
    default:
      return state;
  }
}
