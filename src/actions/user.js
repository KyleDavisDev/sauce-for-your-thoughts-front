import api from "../api/api";
import Auth from "../helper/Auth/Auth";

export const userUpdated = () => ({
  type: "USER_UPDATED",
  text: "You're updates have been applied. Thank you!"
});

export const updateUser = credentials => dispatch => {
  return api.user.update(credentials).then(res => {
    dispatch(userUpdated());
  });
};
