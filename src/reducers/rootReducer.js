import { combineReducers } from "redux";

import user from "./user";
import flashMessage from "./flashMessage";

export default combineReducers({ user, flashMessage });
