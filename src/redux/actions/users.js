import api from "../../api/api";

export const addUsers = ({ users }) => ({
  type: "USERS_ADDED",
  users
});

export const gotHearts = ({ hearts }) => ({
  type: "GOT_HEARTS",
  hearts
});

export const getHearts = credentials => dispatch =>
  api.user.getHearts(credentials).then(res => {
    dispatch(gotHearts({ hearts: res.data.hearts }));
  });
