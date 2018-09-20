import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Screens from "../screens/Screens"; // Routing
import { configureStore } from "../redux/configureStore"; // redux store
import { ThemeProvider, theme } from "../theme/styled-components"; // theme

// Configure/initialize redux store
const store = configureStore();

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
