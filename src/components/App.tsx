import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Screens from "../screens/Screens"; // Routing
import { configureStore } from "../redux/configureStore"; // redux store
import { ThemeProvider, theme, injectGlobal } from "../theme/styled-components"; // theme
import AvenirNextReg from "../theme/fonts/AvenirNext-Regular.ttf";

// Configure/initialize redux store
const store = configureStore();

// tslint:disable-next-line:no-unused-expression
export default injectGlobal`
  @font-face {
    font-family: FuturaMedium;
    src: url("/theme/fonts/Futura-Medium.ttf");
  }
  @font-face {
    font-family: AvenirNextReg;
    src: url('${AvenirNextReg}') format('truetype');
  }

  html {
    background-color: #fbfbfb;
    font-family: AvenirNextReg;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0px;
    font-family: FuturaMedium;
  }
`;

export class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Route children={Screens} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}
