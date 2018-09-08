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
  white: string;
  grey: string;
  navigationTextColor: string;
  navigationIconColor: string;
  landingHeroTextColor: string;

  // primaryThemeColorInverted: string;
}

export enum theme {
  primaryThemeColor = "#3B4DA8",
  white = "#efefef",
  grey = "#676767",
  navigationTextColor = "#efefef",
  navigationIconColor = "#efefef",
  landingHeroTextColor = "#efefef"
  // primaryThemeColorInverted: "#333333"
}

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
