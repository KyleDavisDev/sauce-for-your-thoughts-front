import api from "../api/api";
import Auth from "../helper/Auth/Auth";
import { flashSuccess } from "./flash";

export const userUpdated = () => ({
  type: "USER_UPDATED"
});

export const userSetInfo = ({ email, _id }) => ({
  type: "USER_SET_INFO",
  email,
  _id
});

export const updateUser = credentials => dispatch => {
  return api.user.update(credentials).then(res => {
    dispatch(userUpdated());
    const text = `Your name was saved as: ${
      res.user.name
    } and your email was saved as: ${res.user.email}.`;
    dispatch(flashSuccess({ text }));
    return res.user;
  });
};

export const getInfo = credentials => dispatch => {
  return api.user.getInfo(credentials).then(res => {
    const { email, _id } = res.user;
    dispatch(userSetInfo({ email, _id }));
    return res.user;
  });
};
