import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./reducers/rootReducer";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App/App.js";
import "./scss/style.scss";
import { isLoggedIn } from "./actions/auth";

import Auth from "./helper/Auth/Auth";

const initialState = {
  user: { token: null },
  flashMessage: { isVisible: false, type: null, text: null, slug: null }
};

const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (Auth.isUserAuthenticated()) {
  const user = { token: Auth.getToken() };
  store.dispatch(isLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
registerServiceWorker();
