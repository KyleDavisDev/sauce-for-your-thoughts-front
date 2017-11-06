import api from "../api/api";
import Auth from "../helper/Auth/Auth";
import { flashSuccess } from "./flash";

export const userUpdated = () => ({
  type: "USER_UPDATED"
});

export const updateUser = credentials => dispatch => {
  return api.user.update(credentials).then(res => {
    dispatch(userUpdated());
    const text = `Your name was saved as: ${res.user
      .name} and your email was saved as: ${res.user.email}.`;
    dispatch(flashSuccess({ text }));
  });
};
