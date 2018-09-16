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
  white: string;
  grey: string;
  black: string;

  // primaryThemeColorInverted: string;
}

const enum colors {
  purple = "#3B4DA8",
  white = "#fff",
  grey = "#676767",
  mustard = "#FFA816",
  smoke = "#f5f5f5",
  black = "#333333"
}

export const enum theme {
  primaryThemeColor = colors.mustard,
  secondaryThemeColor = colors.purple,
  navigationTextColor = colors.white,
  navigationIconColor = colors.white,
  landingHeroTextColor = colors.white,
  cardBackgroundColor = colors.white,
  siteBackgroundColor = colors.smoke,
  white = colors.white,
  grey = colors.grey,
  black = colors.black
  // primaryThemeColorInverted: "#333333"
}

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
