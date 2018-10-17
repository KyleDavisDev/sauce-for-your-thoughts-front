import { Reducer } from "redux";
import { IFlashState, IAction, FlashMessageActionTypes } from "./types";

const initialState: IFlashState = {
  isVisible: false,
  type: null,
  text: null,
  slug: null
};

const reducer: Reducer<IFlashState> = (
  state: IFlashState = initialState,
  action: IAction
): IFlashState => {
  switch (action.type) {
    case FlashMessageActionTypes.SUCCESS_FLASH:
      return {
        isVisible: true,
        text: action.text,
        type: "success",
        slug: action.slug || null
      };
    case FlashMessageActionTypes.ERROR_FLASH:
      return {
        isVisible: true,
        text: action.text,
        type: "error",
        slug: action.slug || null
      };
    case FlashMessageActionTypes.WARNING_FLASH:
      return {
        isVisible: true,
        text: action.text,
        type: "error",
        slug: action.slug || null
      };
    case FlashMessageActionTypes.TOGGLE_FLASH:
      return {
        ...state,
        isVisible: !state.isVisible
      };
    case FlashMessageActionTypes.USER_LOGGED_OUT:
    case FlashMessageActionTypes.CLOSE_FLASH:
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
