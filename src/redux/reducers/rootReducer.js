import { combineReducers } from "redux";

// import user from "./user";
import flashMessage from "./flashMessage";
import sauces from "./sauces";
import sauce from "./sauce";
import tags from "./tags";
import reviews from "./reviews";
import users from "./users";

export default combineReducers({
  flashMessage,
  sauces,
  sauce,
  tags,
  reviews,
  users
});
