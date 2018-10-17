export interface IAction {
  type: string;
  slug?: null | string;
  text?: string;
}

// Use const enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum FlashMessageActionTypes {
  SUCCESS_FLASH = "@@flashMessage/SUCCESS_FLASH",
  ERROR_FLASH = "@@flashMessage/ERROR_FLASH",
  WARNING_FLASH = "@@flashMessage/WARNING_FLASH",
  TOGGLE_FLASH = "@@flashMessage/TOGGLE_FLASH",
  USER_LOGGED_OUT = "@@flashMessage/USER_LOGGED_OUT",
  CLOSE_FLASH = "@@flashMessage/CLOSE_FLASH"
}
// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface IFlashState {
  readonly isVisible: boolean;
  readonly type: null | string;
  readonly text: null | string;
  readonly slug: null | string;
}
