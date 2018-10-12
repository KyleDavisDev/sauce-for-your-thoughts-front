import { Reducer } from "redux";
import { IFlashState, IAction } from "./types";

const initialState: IFlashState = {
  isVisible: false,
  type: null,
  text: null,
  slug: null
};

const reducer: Reducer<IFlashState> = (
  state: IFlashState = initialState,
  action: IAction
) => {
  switch (action.type) {
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
};

export default reducer;
