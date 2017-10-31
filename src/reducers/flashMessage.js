export default function flashMessage(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
    case "TOGGLE_TREE":
      return {
        ...state,
        visible: true
      };
    default:
      return state;
  }
}
