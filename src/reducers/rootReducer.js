import { combineReducers } from "redux";

import user from "./user";
import flashMessage from "./flashMessage";
import stores from "./stores";

export default combineReducers({ user, flashMessage, stores });
