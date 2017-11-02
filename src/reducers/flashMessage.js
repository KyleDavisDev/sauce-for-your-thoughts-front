export default function flashMessage(state = {}, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
    case "SUCCESS_FLASH":
      return {
        isVisible: true,
        text: action.text,
        type: "success",
        slug: action.slug || null
      };
    case "ERROR_FLASH":
      return {
        isVisible: true,
        text: action.text,
        type: "error",
        slug: action.slug || null
      };
    case "WARNING_FLASH":
      return {
        isVisible: true,
        text: action.text,
        type: "error",
        slug: action.slug || null
      };
    case "TOGGLE_FLASH":
      return {
        ...state,
        isVisible: !state.isVisible
      };
    case "USER_LOGGED_OUT":
    case "CLOSE_FLASH":
      return {
        isVisible: false,
        type: null,
        text: null,
        slug: null
      };
    default:
      return state;
  }
}
