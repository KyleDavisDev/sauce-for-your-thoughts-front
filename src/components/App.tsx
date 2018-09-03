import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Screens from "../screens/Screens";
// import { configureStore, initStore } from "./store/configStore";

// const store = configureStore();
// store.dispatch<any>(initStore());

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        {/* <Provider> */}
        <Route children={Screens} />
        {/* </Provider> */}
      </BrowserRouter>
    );
  }
}

export default App;
