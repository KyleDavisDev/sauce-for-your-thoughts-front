import { combineReducers } from "redux";

import user from "./user";
import flashMessage from "./flashMessage";
import sauces from "./sauces";
import sauce from "./sauce";
import tags from "./tags";

export default combineReducers({ user, flashMessage, sauces, sauce, tags });
