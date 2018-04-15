import Checker from "../../Helper/Checker/Checker";
import api from "../../api/api";
import Auth from "../../Helper/Auth/Auth";
import { flashSuccess } from "./flash";

export const userLoggedIn = ({ token }) => ({
  type: "USER_LOGGED_IN",
  token
});

export const userLoggedOut = () => ({
  type: "USER_LOGGED_OUT"
});

export const userRegistered = () => ({
  type: "USER_REGISTERED",
  text: "Thank you for registering! You are now logged in."
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(res => {
    const { token } = res.data.user;
    // save token to local storage and set timestamp
    Auth.authenticateUser(token);

    // save token to user in store
    dispatch(userLoggedIn({ token }));

    // dispatch successfull flash
    dispatch(flashSuccess({ text: "Successfully logged in. Thank you!" }));
  });

export const logout = () => dispatch => {
  // remove token and dispatch action
  Auth.deauthenticateUser();
  dispatch(userLoggedOut());
};

export const register = credentials => dispatch =>
  api.user.register(credentials).then(res => {
    const { token } = res.data.user.token;
    Auth.authenticateUser({ token });
    dispatch(userLoggedIn({ token }));
    dispatch(flashSuccess({ text: "Successfully logged in. Thank you!" }));
  });

export const isLoggedIn = credentials => dispatch =>
  api.user.isLoggedIn(credentials).then(res => {
    // token is good if we are here
    dispatch(userLoggedIn({ token: credentials.user.token }));
    dispatch(
      flashSuccess({ text: "Restored your login from last time. Thank you!" })
    );
  });
