import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export interface ThemeInterface {
  primaryThemeColor: string;
  secondaryThemeColor: string;
  navigationTextColor: string;
  navigationIconColor: string;
  landingHeroTextColor: string;
  cardBackgroundColor: string;
  siteBackgroundColor: string;
  userCubeBackgroundColor: string;
  userCubeTextColor: string;
  maxPageWidth: string;
  footerMaxWidth: string;
  scaleP: string;
  scaleH2: string;
  scaleH5: string;
  scaleH6: string;
  defaultFontSize: string;
  white: string;
  grey: string;
  black: string;
}

const enum colors {
  purple = "#3B4DA8",
  white = "#fff",
  grey = "#676767",
  mustard = "#FFA816",
  smoke = "#f5f5f5",
  black = "#333333"
}

const enum scale {
  defaultFontSize = "16px",
  maxPageWidth = "75rem",
  footerMaxWidth = "300px",
  scaleP = "1rem",
  scaleH2 = "1.875rem",
  scaleH5 = "1.125rem",
  scaleH6 = "1rem"
}

export const enum theme {
  primaryThemeColor = colors.mustard,
  secondaryThemeColor = colors.purple,
  navigationTextColor = colors.white,
  navigationIconColor = colors.white,
  landingHeroTextColor = colors.white,
  cardBackgroundColor = colors.white,
  siteBackgroundColor = colors.smoke,
  userCubeBackgroundColor = colors.white,
  userCubeTextColor = colors.mustard,
  white = colors.white,
  grey = colors.grey,
  black = colors.black,
  maxPageWidth = scale.maxPageWidth,
  defaultFontSize = scale.defaultFontSize,
  footerMaxWidth = scale.footerMaxWidth,
  scaleP = scale.scaleP,
  scaleH2 = scale.scaleH2,
  scaleH5 = scale.scaleH5,
  scaleH6 = scale.scaleH6
}

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
