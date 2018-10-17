import { IAction } from "./types";

export const flashSuccess = ({
  text,
  slug = null
}: {
  text: string;
  slug: null | string;
}): IAction => ({
  type: "SUCCESS_FLASH",
  text,
  slug
});

export const flashError = ({
  text,
  slug = null
}: {
  text: string;
  slug: null | string;
}): IAction => ({
  type: "ERROR_FLASH",
  text,
  slug
});

export const flashWarning = ({
  text,
  slug = null
}: {
  text: string;
  slug: null | string;
}): IAction => ({
  type: "WARNING_FLASH",
  text,
  slug
});

export const flashToggle = (): IAction => ({
  type: "TOGGLE_FLASH"
});

export const flashClose = (): IAction => ({
  type: "CLOSE_FLASH"
});
