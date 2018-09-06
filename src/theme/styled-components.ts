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
  primaryColor: string;
  white: string;
  grey: string;
  navigationColor: string;
  // primaryColorInverted: string;
}

export const theme = {
  primaryColor: "#3B4DA8",
  white: "#efefef",
  grey: "#676767",
  navigationColor: "#efefef"
  // primaryColorInverted: "#333333"
};

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
