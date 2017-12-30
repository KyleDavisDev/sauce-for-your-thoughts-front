export default function store(state = {}, action) {
  switch (action.type) {
    case "STORE_FOUND":
      return action.store
    default:
      return state;
  }
}