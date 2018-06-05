import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import RootReducer from "./redux/reducers/rootReducer";
import Screens from "./screens/Screens";
import "./scss/style.scss";
import { isLoggedIn } from "./redux/actions/auth";

import Auth from "./Helper/Auth/Auth";

const initialState = {
  flashMessage: { isVisible: false, type: null, text: null, slug: null },
  sauces: { allIds: [], byId: {}, total: 0, query: {} },
  sauce: {},
  tags: [],
  users: { self: { token: Auth.getToken() || "" }, byId: {}, allIds: [] },
  reviews: { byId: {}, allIds: [] }
};

const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (Auth.isUserAuthenticated()) {
  const data = { user: { token: Auth.getToken() } };
  store.dispatch(isLoggedIn(data));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={Screens} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
