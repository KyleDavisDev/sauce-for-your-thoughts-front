export default function stores(state = [], action) {
  switch (action.type) {
    case "STORES_GOT":
      return action.stores;
    case "UPDATED_STORES_ITEM":
      //update single stores item if stores is already set
      return state
        ? state.map(store => {
            if (store._id === action.store._id) {
              action.store.author = store.author;
              return action.store;
            }
            return store;
          })
        : [];
    case "STORES_BY_TAG_GOT":
      return action.stores;
    default:
      return state;
  }
}
