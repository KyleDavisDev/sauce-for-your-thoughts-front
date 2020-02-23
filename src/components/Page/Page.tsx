import * as React from "react";

import {
  ThemeProvider,
  theme,
  createGlobalStyle
} from "../../theme/styled-components";

import AvenirNextReg from "/static/AvenirNext-Regular.ttf";
import FuturaMedium from "/static/Futura-Medium.ttf";

interface IPageProps {
  children?: any;
}

const GlobalStyle = createGlobalStyle`

 @font-face {
  font-family: FuturaMedium;
  src: url('/static/AvenirNext-Regular.ttf') format('truetype');
  font-weight: normal;
    font-style: normal;
}
@font-face {
  font-family: AvenirNextReg;
  src: url('/static/AvenirNext-Regular.ttf') format('truetype');
  font-weight: normal;
    font-style: normal;
}

a {
  font-family: AvenirNextReg !important;
}

html {
  background-color: #fbfbfb;
  font-family: AvenirNextReg;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0px;
  font-family: FuturaMedium;
}`;

const Page: React.FunctionComponent<IPageProps> = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
};

export default Page;
