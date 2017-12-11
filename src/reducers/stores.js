export default function stores(state = {}, action) {
  switch (action.type) {
    case "STORES_GOT":
      return action.stores;
    default:
      return state;
  }
}
