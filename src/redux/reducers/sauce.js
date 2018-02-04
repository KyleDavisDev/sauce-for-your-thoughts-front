export default function sauce(state = {}, action) {
  switch (action.type) {
    case "SAUCE_FOUND":
      return action.sauce;
    case "SAUCE_UPDATED":
      return {};
    default:
      return state;
  }
}
