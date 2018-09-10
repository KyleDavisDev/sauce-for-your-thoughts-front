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
  white: string;
  grey: string;
  navigationTextColor: string;
  navigationIconColor: string;
  landingHeroTextColor: string;

  // primaryThemeColorInverted: string;
}

const enum colors {
  purple = "#3B4DA8",
  white = "#efefef",
  grey = "#676767",
  mustard = "#FFA816"
}

export const enum theme {
  primaryThemeColor = colors.purple,
  secondaryThemeColor = colors.mustard,
  white = colors.white,
  grey = colors.grey,
  navigationTextColor = colors.white,
  navigationIconColor = colors.white,
  landingHeroTextColor = colors.white
  // primaryThemeColorInverted: "#333333"
}

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
