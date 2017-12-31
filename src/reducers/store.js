export default function store(state = {}, action) {
  switch (action.type) {
    case "STORE_FOUND":
      return action.store;
    case "STORE_UPDATED":
      return {};
    default:
      return state;
  }
}
