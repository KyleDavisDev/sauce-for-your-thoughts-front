import { combineReducers } from "redux";

import user from "./user";
import flashMessage from "./flashMessage";
import stores from "./stores";
import store from "./store"

export default combineReducers({ user, flashMessage, stores, store });
