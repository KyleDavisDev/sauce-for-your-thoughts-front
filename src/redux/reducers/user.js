export default function user(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        token: action.token
      };
    case "USER_GOT_INFO":
      return {
        ...state,
        email: action.email,
        name: action.name
      };
    case "USER_UPDATED":
      return {
        ...state,
        email: action.email,
        name: action.name
      };
    case "USER_LOGGED_OUT":
      return {};

    default:
      return state;
  }
}
