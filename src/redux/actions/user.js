import api from "../../api/api";
import { flashSuccess } from "./flash";

export const userUpdated = ({ email, name }) => ({
  type: "USER_UPDATED",
  email,
  name
});

export const userGotInfo = ({ email, name }) => ({
  type: "USER_GOT_INFO",
  email,
  name
});

export const gotHearts = ({ hearts }) => ({
  type: "GOT_HEARTS",
  hearts
});

export const toggledHeart = ({ sauce }) => ({
  type: "TOGGLE_HEARTED",
  sauce
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
    const { email, name } = res.user;
    dispatch(userGotInfo({ email, name }));
    return res.user;
  });
};

export const toggleSauce = data => dispatch => {
  return api.user.toggleSauce(data).then(res => {
    dispatch(toggledHeart({ sauce: res.data.sauce }));
  });
};

export const getHearts = credentials => dispatch => {
  return api.user.getHearts(credentials).then(res => {
    dispatch(gotHearts({ hearts: res.data.hearts }));
  });
};
