import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export interface ThemeInterface {
  primaryThemeColor: string;
  secondaryThemeColor: string;
  navigationTextColor: string;
  navigationIconColor: string;
  landingHeroTextColor: string;
  cardBackgroundColor: string;

  checkBoxActiveColor: string;
  checkBoxInActiveColor: string;
  checkBoxActiveTextColor: string;
  checkBoxInActiveTextColor: string;

  siteBackgroundColor: string;

  userCubeBackgroundColor: string;
  userCubeTextColor: string;

  formContainerBackgroundColor: string;
  maxPageWidth: string;
  footerMaxWidth: string;

  scaleP: string;
  scaleH1: string;
  scaleH2: string;
  scaleH3: string;
  scaleH4: string;
  scaleH5: string;
  scaleH6: string;
  defaultFontSize: string;

  white: string;
  grey: string;
  lightGrey: string;
  black: string;
}

const enum colors {
  purple = "#3B4DA8",
  white = "#fff",
  grey = "#676767",
  lightGrey = "#CCCCCC",
  mustard = "#FFA816",
  smoke = "#f5f5f5",
  black = "#333333"
}

const enum scale {
  defaultFontSize = "16px",
  maxPageWidth = "75rem",
  footerMaxWidth = "300px",
  scaleP = "1rem",
  scaleH1 = "2.5rem",
  scaleH2 = "2.25rem",
  scaleH3 = "2rem",
  scaleH4 = "1.875rem",
  scaleH5 = "1.125rem",
  scaleH6 = "1rem"
}

export const theme = {
  primaryThemeColor: colors.mustard,
  secondaryThemeColor: colors.purple,
  navigationTextColor: colors.white,
  navigationIconColor: colors.white,
  landingHeroTextColor: colors.white,
  cardBackgroundColor: colors.white,

  checkBoxActiveBackgroundColor: colors.mustard,
  checkBoxInActiveBackgroundColor: colors.lightGrey,
  checkBoxActiveTextColor: colors.black,
  checkBoxInActiveTextColor: colors.black,

  siteBackgroundColor: colors.smoke,
  userCubeBackgroundColor: colors.white,
  userCubeTextColor: colors.mustard,
  formContainerBackgroundColor: colors.white,
  maxPageWidth: scale.maxPageWidth,
  defaultFontSize: scale.defaultFontSize,
  footerMaxWidth: scale.footerMaxWidth,

  scaleP: scale.scaleP,
  scaleH1: scale.scaleH1,
  scaleH2: scale.scaleH2,
  scaleH3: scale.scaleH3,
  scaleH4: scale.scaleH4,
  scaleH5: scale.scaleH5,
  scaleH6: scale.scaleH6,

  white: colors.white,
  grey: colors.grey,
  black: colors.black
};

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
