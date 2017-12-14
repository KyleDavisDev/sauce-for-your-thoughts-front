import api from "../api/api";
import Auth from "../helper/Auth/Auth";
import { flashSuccess } from "./flash";

export const userUpdated = ({ email, name }) => ({
  type: "USER_UPDATED",
  email,
  name
});

export const userSetInfo = ({ email, _id, name }) => ({
  type: "USER_SET_INFO",
  email,
  _id,
  name
});

export const updateUser = credentials => dispatch => {
  return api.user.update(credentials).then(res => {
    const { email, name } = res.user;
    dispatch(userUpdated({ email, name }));
    const text = `Your name was saved as: ${name} and your email was saved as: ${email}.`;
    dispatch(flashSuccess({ text }));
    return res.user;
  });
};

export const getInfo = credentials => dispatch => {
  return api.user.getInfo(credentials).then(res => {
    const { email, _id, name } = res.user;
    dispatch(userSetInfo({ email, _id, name }));
    return res.user;
  });
};
