import Checker from "../helper/Checker/Checker";
import axios from "axios";

export const userLoggedIn = user => ({
  type: "USER_LOGGED_IN",
  user
});

export const login = credentials => dispatch => {
  const data = credentials;
  axios({
    method: "post",
    url: "http://localhost:7777/login",
    data
  })
    .then(response => {
      console.log(response);
      //if response.token exists then we know user was able to log in fully
      if (Checker.isObject(response.data) && response.data.isGood) {
        //use function defined in Router.js to log in user - this will cause
        //Router.js to update state and force render() thus updating the navigation component
        dispatch(userLoggedIn(response.data.token));
      } else {
      }
    })
    .catch(error => {
      console.log(error);
    });
};
