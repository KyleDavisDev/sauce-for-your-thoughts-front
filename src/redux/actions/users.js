import api from "../../api/api";

export const addUsers = ({ users }) => ({
  type: "USERS_ADDED",
  users
});
