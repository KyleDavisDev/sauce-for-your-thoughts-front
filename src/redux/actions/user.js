import api from "../../api/api";
import { flashSuccess } from "./flash";

export const userUpdated = ({ email, name }) => ({
  type: "USER_UPDATED",
  email,
  name
});
