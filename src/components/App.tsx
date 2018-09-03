import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Screens from "../screens/Screens";
import { configureStore } from "../redux/configureStore";

const store = configureStore();

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Route children={Screens} />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
