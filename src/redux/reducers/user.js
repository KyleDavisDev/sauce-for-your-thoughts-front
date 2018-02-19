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
    case "GOT_HEARTS":
      return {
        ...state,
        hearts: action.hearts
      };
    case "TOGGLE_HEARTED":
      //find index of id from the current hearts array
      //this will help us to determine whether we need to add element to array or remove it
      const ind = state.hearts.indexOf(action.sauce._id);
      return {
        ...state,
        hearts:
          ind === -1 //check to add or remove
            ? state.hearts.concat(action.sauce._id) //concat returns new array
            : state.hearts.filter(x => x !== action.sauce._id) //filter returns new array
      };
    default:
      return state;
  }
}
