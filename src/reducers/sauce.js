export default function sauce(state = {}, action) {
  switch (action.type) {
    case "STORE_FOUND":
      return action.sauce;
    case "STORE_UPDATED":
      return {};
    default:
      return state;
  }
}
