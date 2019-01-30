import { IAction, IParam, FlashMessageActionTypes } from "./types";

export const flashSuccess = ({ text, slug = null }: IParam): IAction => ({
  type: FlashMessageActionTypes.SUCCESS_FLASH,
  text,
  slug
});

export const flashError = ({ text, slug = null }: IParam): IAction => ({
  type: FlashMessageActionTypes.ERROR_FLASH,
  text,
  slug
});

export const flashWarning = ({ text, slug = null }: IParam): IAction => ({
  type: FlashMessageActionTypes.WARNING_FLASH,
  text,
  slug
});

export const flashToggle = (): IAction => ({
  type: FlashMessageActionTypes.TOGGLE_FLASH
});

export const flashClose = (): IAction => ({
  type: FlashMessageActionTypes.CLOSE_FLASH
});
