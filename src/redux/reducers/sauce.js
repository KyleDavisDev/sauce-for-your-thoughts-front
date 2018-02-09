export default function sauce(state = {}, action) {
  switch (action.type) {
    case "SAUCE_FOUND":
      return action.sauce;
    case "SAUCE_UPDATED":
      return {};
    case "CLEANED_UP_SAUCE":
      return {}; //clear sauce from redux store
    default:
      return state;
  }
}
