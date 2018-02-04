import api from "../../api/api";
import { flashSuccess } from "./flash";
import { sauceHearted, sauceUnHearted } from "./sauces";

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

export const heartSauce = data => dispatch => {
  return api.user.heartSauce(data).then(res => {
    dispatch(sauceHearted({ sauce: res.data.sauce }));
  });
};

export const unHeartSauce = data => dispatch => {
  return api.user.unHeartSauce(data).then(res => {
    dispatch(sauceUnHearted({ sauce: res.data.sauce }));
  });
};
