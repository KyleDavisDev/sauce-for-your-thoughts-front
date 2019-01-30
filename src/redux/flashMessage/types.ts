export interface IAction {
  type: string;
  slug?: null | string;
  text?: string;
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
export const enum FlashMessageActionTypes {
  SUCCESS_FLASH = "@@flashMessage/SUCCESS_FLASH",
  ERROR_FLASH = "@@flashMessage/ERROR_FLASH",
  WARNING_FLASH = "@@flashMessage/WARNING_FLASH",
  TOGGLE_FLASH = "@@flashMessage/TOGGLE_FLASH",
  USER_LOGGED_OUT = "@@flashMessage/USER_LOGGED_OUT",
  CLOSE_FLASH = "@@flashMessage/CLOSE_FLASH"
}

export interface IFlashState {
  isVisible: boolean;
  type: null | string;
  text: null | string;
  slug: null | string;
}
