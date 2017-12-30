export default function user(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        token: action.user
      };
    case "USER_GOT_INFO":
      return {
        ...state,
        email: action.email
      };
    case "USER_UPDATED":
      return {
        ...state,
        email: action.email
      };
    case "USER_LOGGED_OUT":
      return {};
    default:
      return state;
  }
}
