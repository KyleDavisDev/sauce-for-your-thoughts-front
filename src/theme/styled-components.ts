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
  fontSize: string;
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
  maxPageWidth = "1200px",
  fontSize = "16px"
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
  fontSize = scale.fontSize
}

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
