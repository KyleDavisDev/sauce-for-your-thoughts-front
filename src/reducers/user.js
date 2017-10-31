export default function user(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return { ...state, token: action.user };
    default:
      return state;
  }
}
