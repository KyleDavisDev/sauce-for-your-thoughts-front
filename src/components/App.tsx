import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Screens from "../screens/Screens"; // Routing
import { configureStore } from "../redux/configureStore"; // redux store
import { ThemeProvider, theme, injectGlobal } from "../theme/styled-components"; // theme

// Configure/initialize redux store
const store = configureStore();

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  @font-face {
    font-family: FuturaMedium;
    src: url("/theme/fonts/Futura-Medium.ttf");
  }
  @font-face {
    font-family: AvenirNextReg;
    src: url("/theme/fonts/AvenirNext-Regular.ttf");
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0px;
  }
`;

class App extends React.Component<{}, {}> {
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

export default App;
