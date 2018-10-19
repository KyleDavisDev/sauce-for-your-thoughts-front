import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import RflashMessage from "./flashMessage/reducer";
import Rsauces from "./sauces/reducer";
import Rreviews from "./reviews/reducer";
import Rusers from "./users/reducer";

const rootReducer = combineReducers({
  RflashMessage,
  Rsauces,
  Rreviews,
  Rusers
});

export const configureStore = () => {
  const initialState: object = {
    sauces: {
      allIds: [],
      byId: {},
      total: 0,
      query: {}
    },
    users: { self: { token: "123" }, byId: {}, allIds: [] },
    reviews: { byId: {}, allIds: [] }
  };

  if (process.env.NODE_ENV === "production") {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
  } else {
    return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }
};
