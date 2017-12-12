export default function user(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        token: action.user
      };
    case "USER_SET_INFO":
      return { ...state, email: action.email, _id: action._id };
    case "USER_LOGGED_OUT":
      return {};
    default:
      return state;
  }
}
