import { combineReducers } from "redux";

import flashMessage from "./flashMessage";
import sauces from "./sauces";
import sauce from "./sauce";
import tags from "./tags";
import reviews from "./reviews";
import users from "./users";

export const rootReducer = combineReducers({
  flashMessage,
  sauces,
  sauce,
  tags,
  reviews,
  users
});
